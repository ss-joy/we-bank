import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/types/api-responses";
import ShoppingTransaction from "@/models/shopping-transaction";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    console.log(req.body);
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to Database");
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }

    const userId = req.query.id;

    const transactions = await ShoppingTransaction.find({
      ecom_user_id: userId,
    });
    if (!transactions) {
      return res.status(500).json({
        status: "error",
        message: "No transactions found. Buy something first..",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Showing all products transactions",
      data: transactions,
    });
  } else {
    return res.status(405).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
