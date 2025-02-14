import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { User } from "../../../models/auth/user.model";
import { Request, Response, NextFunction } from "express";
import { workspaceCookie } from "../workspace.controller";
import UserService from "../../../service/user.service";

export const UserInfo = asyncHandler(async (req: Request, res: Response) => {
  const token = req.user;
  if (!token) {
    return res
      .status(401)
      .json(
        new ApiResponse(401, {}, "Token not found. \n Redirecting to login...")
      );
  }

  const user = await UserService.getUser(req.user._id);

  // Todo : Just for short time to get the workspace id after remove it
  res.cookie("workspace_id", user?.workspaces[0], workspaceCookie);

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "User is not authenticated"));
  }
  return res.status(200).json(new ApiResponse(200, user, "Authorized"));
});
