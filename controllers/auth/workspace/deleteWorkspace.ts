import { Request, Response } from "express";
import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { workspaceCookie } from "../workspace.controller";
import WorkspaceService from "../../../service/workspace.service";
import UserService from "../../../service/user.service";

export const deleteWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.cookies.workspace_id;
    const userId = req.user._id;
    if (!workspaceId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
    }

    const workspace = await WorkspaceService.deleteWorkspace(
      workspaceId,
      userId
    );

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
