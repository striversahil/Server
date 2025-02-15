import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { User } from "../../../models/auth/user.model";
import { Request, Response, NextFunction } from "express";
import generateAccessRefreshToken from "../../../utils/generateAccessRefreshToken";
import { Usercookie, UserType } from "../user.controller";
import UserService from "../../../service/user.service";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: UserType = req.body;

    // Validation Checks

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }

    const userExists = await UserService.getUserByEmail(email);
    if (userExists) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already exists with this email"));
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Password must be at least 6 characters")
        );
    }

    // Creating New User

    const newUser = await UserService.createUser(name, email, password);

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
    newUser.refreshToken = refreshToken;

    res.cookie("access_token", accessToken, Usercookie);

    newUser.save();

    if (!newUser) {
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

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          username: name,
          message: "User Created Successfully 🚀",
        },
        "User Created Successfully 🚀"
      )
    );
  }
);
