import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/api-responses";
import { TransactionSchemaType, transactionSchema } from "@/schema/transaction";
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

    let userFound = undefined;
    const body: TransactionSchemaType = req.body;
    console.log(body);
    try {
      userFound = await User.findOne({
        email: body.userEmail,
      });
      if (!userFound) {
        return res.status(405).json({
          message: "User not found",
          status: "error",
        });
      }
    } catch (error) {
      return res.status(405).json({
        message: "User not found",
        status: "error",
      });
    }

    if (userFound.balance > req.body.amount) {
      const trxId = await hash(
        userFound.email +
          userFound.id +
          req.body.amount +
          body.userId +
          Date.now(),
        7
      );
      const dbResponse1 = await User.updateOne(
        { email: body.userEmail },
        { balance: userFound.balance - req.body.amount }
      );
      const dbResponse2 = await ShoppingTransaction.create({
        trxId: trxId,
        ecom_user_id: body.userId,
        total_cost: body.amount,
        email: userFound.email,
        trx_date: new Date(),
      });
      if (!dbResponse1 || !dbResponse2) {
        return res.status(500).json({
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
  } else {
    return res.status(405).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
