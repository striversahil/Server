import { Request, Response } from "express";
import mongoose from "mongoose";
import { Workspace } from "../../models/auth/workspace.model";
import { User } from "../../models/auth/user.model";
import ApiResponse from "../../helper/ApiResponse";
import asyncHandler from "../../helper/asyncHandler";

export const Testing = asyncHandler(async (req: Request, res: Response) => {
  const Id = req.params.workspaceId;

  return res
    .status(200)
    .json({ message: "Welcome to Workspace Routes", Id: Id });
});

export const newWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User is not authenticated"));
    }

    const workspace = await Workspace.create({
      user: req.user._id,
    });

    if (!workspace) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Workspace could not be created \n Server Error"
          )
        );
    }

    workspace.save();

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "User could not be found \n Redirecting to login..."
          )
        );
    }
    user.workspaces.push();
    user.save();

    return res.status(200).json({
      message: "Welcome to Workspace Routes",
      workspace: workspace,
      user: user,
    });
  }
);
