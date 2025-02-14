import { Request, Response } from "express";
import { Workspace } from "../../../models/workspace/workspace.model";
import { User } from "../../../models/auth/user.model";
import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { workspaceCookie } from "../workspace.controller";
import WorkspaceService from "../../../service/workspace.service";
import UserService from "../../../service/user.service";

export const newWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User is not authenticated"));
    }

    const workspace = await WorkspaceService.createWorkspace(req.body.name);

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

    const user = await UserService.getUser(req.user._id);
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
    user.workspaces = [...user.workspaces, workspace._id];
    user.save();
    res.cookie("workspace_id", workspace._id, workspaceCookie);

    return res
      .status(200)
      .json(
        new ApiResponse(200, workspace, "Workspace Created Successfully 🚀")
      );
  }
);
