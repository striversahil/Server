import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../helper/ApiResponse";
import generateAccessRefreshToken from "../utils/generateAccessRefreshToken";

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        _id: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(200)
      .json(
        new ApiResponse(401, {}, "No token found. \n Redirecting to login...")
      );
  }
  // Todo : Verify Token Safely
  jwt.verify(token, "sahil", async (err: any, decoded: any) => {
    if (err) {
      return res
        .status(200)
        .json(
          new ApiResponse(401, {}, "Error in token. \n Redirecting to login...")
        );
    }
    // Passing the User to the next middleware

    if (!decoded) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "User is not authenticated"));
    }

    const now = new Date();
    const Expiry_left_in_hours = Math.floor(
      (decoded.exp * 1000 - now.getTime()) / (60 * 60 * 1000)
    );
    // Todo : Check for Expiry Reality
    console.log(Expiry_left_in_hours);

    if (Expiry_left_in_hours < 20) {
      const tokenResponse = await generateAccessRefreshToken(decoded.email);
      if (!tokenResponse) {
        return res
          .status(500)
          .json(
            new ApiResponse(
              500,
              {},
              "User could not be authenticated due to server error"
            )
          );
      }
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("access_token", tokenResponse.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
      });
    }

    req.user = decoded;
  });
  next();
};

export const authController = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "User is Authenticated"));
  } catch (error) {
    console.log("Error in Auth Middleware", error);
  }
};
