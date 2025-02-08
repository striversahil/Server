import { Request, Response } from "express";
import { Workspace } from "../../../models/auth/workspace.model";
import { User } from "../../../models/auth/user.model";
import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { workspaceCookie } from "../workspace.controller";

export const deleteWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.cookies.workspace_id;
    if (!workspaceId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
    }

    const workspace = await Workspace.findByIdAndDelete(workspaceId);

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
    user.workspaces = user.workspaces.filter(
      (workspace) => workspace.toString() !== workspaceId
    );
    user.save();

    res.clearCookie("workspace_id");

    if (!workspace) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Workspace could not be deleted \n Server Error"
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, workspace, "Workspace Deleted Successfully 🌋")
      );
  }
);
