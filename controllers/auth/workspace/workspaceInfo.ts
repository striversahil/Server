import { Request, Response } from "express";
import { Workspace } from "../../../models/workspace/workspace.model";
import { User } from "../../../models/auth/user.model";
import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { workspaceCookie } from "../workspace.controller";
import WorkspaceService from "../../../service/workspace.service";

export const WorkSpaceInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const WorkspaceId = req.cookies.workspace_id;

    if (!WorkspaceId) {
      return res
        .status(202)
        .json(new ApiResponse(401, {}, "Redirecting to login..."));
    }

    const workspace = await WorkspaceService.getWorkspace(WorkspaceId);

    if (!workspace) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, {}, "Workspace could not be found try Create it")
        );
    }

    // Adding this so that everytime user refreshes the page, the cookie is updated
    res.cookie("workspace_id", workspace._id, workspaceCookie);

    return res
      .status(200)
      .json(new ApiResponse(200, workspace, "Workspace Found and Authorized"));
  }
);
