import { BanktransactionSchemaType } from "./../../../schema/bank-transaction-data-schema";
import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/api-responses";
import { hash } from "bcrypt";
import ShoppingTransaction from "@/models/shopping-transaction";
import { BanktransactionSchema } from "@/schema/bank-transaction-data-schema";
import { trasnsactMoneyToEachSeller } from "@/lib/transactions";

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
      BanktransactionSchema.parse(req.body);
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
    /**
     * DOES BUYER EXIST
     */
    let buyerFound = undefined;
    const body: BanktransactionSchemaType = req.body;

    try {
      buyerFound = await User.findOne({
        userEcommerceId: body.buyerId,
      });
      if (!buyerFound) {
        return res.status(404).json({
          message: "User not found",
          status: "error",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "User not found",
        status: "error",
      });
    }

    /**
     * CHECK BALANCE
     */
    if (buyerFound.balance < body.totalCost) {
      return res.status(403).json({
        status: "error",
        message: "Insufficient balance",
      });
    }
    /**
     * CREATE TRANSACTION ID
     */
    const trxId = await hash(
      buyerFound.email +
        buyerFound.id +
        body.totalCost +
        JSON.stringify(body.cartProductsDetails) +
        Date.now(),
      7
    );
    /**
     *  SUBTRACT MONEY FROM BUYER
     */

    try {
      const response = await User.updateOne(
        {
          userEcommerceId: buyerFound.userEcommerceId,
        },
        {
          balance: buyerFound.balance - body.totalCost,
        }
      );
      if (!response) {
        throw new Error("transaction failed");
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "transaction failed",
        error: {
          errorCode: 500,
          errorBody: error,
        },
      });
    }
    /**
     * TRANSACT MONEY TO SELLERS
     */
    try {
      await Promise.all(
        body.cartProductsDetails.map((product) => {
          return trasnsactMoneyToEachSeller(product);
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "transaction failed",
        error: {
          errorCode: 500,
          errorBody: error,
        },
      });
    }
    /**
     * SAVING TRANSACTION TO DB
     */
    try {
      const response = await ShoppingTransaction.create({
        trxId: trxId,
        totalCost: body.totalCost,
        buyerId: body.buyerId,
        buyerEmail: body.buyerEmail,
        trxDate: Date.now(),
        transactionsItemsLists: body.cartProductsDetails,
      });
      if (!response) {
        throw new Error("Transaction failed");
      }
      return res.status(201).json({
        status: "success",
        message: "transaction successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "transaction failed",
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
