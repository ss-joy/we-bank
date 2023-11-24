import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/api-responses";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to Database");
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    // console.log(req.query.id);

    try {
      const userFound = await User.findById(req.query.id);
      if (!userFound) {
        return res.status(405).json({
          message: "User not found",
          status: "error",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "OK",
        data: {
          name: userFound.name,
          email: userFound.email,
          balance: userFound.balance,
        },
      });
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
