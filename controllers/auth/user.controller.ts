import bcrypt from "bcrypt";
import ApiResponse from "../../helper/ApiResponse";
import asyncHandler from "../../helper/asyncHandler";
import { User } from "../../models/auth/user.model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type UserType = {
  name?: string;
  email: string;
  password: string;
};

export const generateAccessRefreshToken = async (
  email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        accessToken: "",
        refreshToken: "",
      };
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("There is an error in generating access and refresh token");
    return {
      accessToken: "",
      refreshToken: "",
    };
  }
};
const isProduction = process.env.NODE_ENV === "production";

const cookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days of cookie
};

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

    const userExists = await User.findOne({ email });
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

    const newUser = await User.create({
      name: name as string,
      email: email as string,
      password: password as string,
    });

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

    res.cookie("access_token", accessToken, cookie);

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
          user: password,
        },
        "User Created Successfully 🚀"
      )
    );
  }
);

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

    res.cookie("access_token", accessToken, cookie);

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

export const UserInfo = asyncHandler(async (req: Request, res: Response) => {
  const token = req.user;
  if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Redirecting to login..."));
  }

  const user = await User.findOne({ _id: token._id });

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "User is not authenticated"));
  }
  return res.status(200).json(new ApiResponse(200, user, "Authorized"));
});
