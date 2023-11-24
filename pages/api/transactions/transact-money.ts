import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/api-responses";
import { transactionSchema } from "@/schema/transaction";
import { hash } from "bcrypt";
import ShoppingTransaction from "@/models/shopping-transaction";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to Database");
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }

    try {
      transactionSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        message: "Please enter all the required informations..",
        status: "error",
        error: {
          errorCode: 400,
          errorBody: error,
        },
      });
    }
    try {
      const userFound = await User.findOne({
        email: req.body.email,
      });

      if (!userFound) {
        return res.status(405).json({
          message: "User not found",
          status: "error",
        });
      }
      if (userFound.balance > req.body.amount) {
        const dbResponse1 = await User.updateOne(
          { email: req.body.email },
          { balance: userFound.balance - req.body.amount }
        );
        const trxId = await hash(
          userFound.email + userFound.id + req.body.amount + Date.now(),
          7
        );
        const dbResponse2 = await ShoppingTransaction.create({
          trxId: trxId,
          total_cost: req.body.amount,
          userId: userFound.id,
          email: userFound.email,
          trx_date: new Date(),
        });
        if (!dbResponse1 || !dbResponse2) {
          return res.status(200).json({
            status: "error",
            message: "transaction failed",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "transaction successful",
        });
      } else {
        return res.status(400).json({
          status: "error",
          message: "Insufficient balance",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong. Please try again!",
        status: "error",
        error: {
          errorCode: 500,
          errorBody: error,
        },
      });
    }
  } else {
    return res.status(405).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
