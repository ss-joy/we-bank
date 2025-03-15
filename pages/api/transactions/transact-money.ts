import { BanktransactionSchemaType } from "./../../../schema/bank-transaction-data-schema";
import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/api-responses";
import { BanktransactionSchema } from "@/schema/bank-transaction-data-schema";

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

    /**
     * VALIDATE REQUEST BODY
     */
    try {
      BanktransactionSchema.parse(req.body);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:
          "Bank: Please enter all the required informations for making a successfull order",
        status: "error",
        error: {
          errorCode: 400,
          errorBody: error,
        },
      });
    }

    const body: BanktransactionSchemaType = req.body;
    const buyerFound = await User.findOne({
      userEcommerceId: body.buyerId,
    });

    if (!buyerFound) {
      return res.status(404).json({
        message:
          "Bank: Please open a we-bank account before ordering your products.",
        status: "error",
      });
    }

    if (buyerFound.balance < body.totalTransactionAmount) {
      return res.status(422).json({
        status: "error",
        message: "Bank: You have insuffecient balance in your bank!",
      });
    }

    await User.updateOne(
      {
        userEcommerceId: body.buyerId,
      },
      {
        $inc: {
          balance: -body.totalTransactionAmount,
        },
      }
    );

    /**
     * TRANSACT MONEY TO SELLERS
     */
    try {
      const transactionPromises = body.orderedProducts.map((oP) => {
        return User.findOneAndUpdate(
          { userEcommerceId: oP.sellerId },
          {
            $inc: {
              balance: oP.totalCostForTheProduct,
            },
          }
        );
      });

      await Promise.all(transactionPromises);

      return res.status(201).json({
        status: "success",
        message: "Bank: You have successfully placed your order!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Bank: Placing order failed",
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
