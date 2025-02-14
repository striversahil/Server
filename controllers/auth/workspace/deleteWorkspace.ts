import { Request, Response } from "express";
import ApiResponse from "../../../helper/ApiResponse";
import asyncHandler from "../../../helper/asyncHandler";
import { workspaceCookie } from "../workspace.controller";
import WorkspaceService from "../../../service/workspace.service";
import UserService from "../../../service/user.service";

export const deleteWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.cookies.workspace_id;
    if (!workspaceId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
    }

    const workspace = await WorkspaceService.deleteWorkspace(workspaceId);

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
    user.workspaces = user.workspaces.filter(
      (workspace: string) => workspace.toString() !== workspaceId
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
