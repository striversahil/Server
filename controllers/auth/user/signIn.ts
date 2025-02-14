import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { User } from "../../../models/auth/user.model";
import { Request, Response } from "express";

import generateAccessRefreshToken from "../../../utils/generateAccessRefreshToken";
import { Usercookie, UserType } from "../user.controller";

export const signIN = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: UserType = req.body;

  if (!email || !password || !req.body) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please Provide all the required fields"));
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User does not exist with this email"));
  }

  const verified = await userExists.isCorrectPassword(password);

  if (!verified) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password is incorrect"));
  }

  if (verified) {
    const tokenResponse = await generateAccessRefreshToken(email);
    if (!tokenResponse) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "User not created successfully due to server error"
          )
        );
    }
    const accessToken = tokenResponse.accessToken;
    const refreshToken = tokenResponse.refreshToken;

    // Saving Refresh Token
    userExists.refreshToken = refreshToken;

    res.cookie("access_token", accessToken, Usercookie);

    await userExists.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          username: userExists.name,
          message: "User Signed In Successfully 🚀",
          user: userExists, //Todo : Remove this as it Exposes everything
        },
        "User Signed In Successfully"
      )
    );
  }
});
