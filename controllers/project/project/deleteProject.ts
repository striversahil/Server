import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Project } from "../../../models/project/project.model";
import { Workspace } from "../../../models/workspace/workspace.model";
import ProjectService from "../../../service/project.service";

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.cookies.project_id;
    const workspaceId = req.cookies.workspace_id;
    if (!projectId || !workspaceId) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Project or Workspace does not exist Create it"
          )
        );
    }

    const project = await ProjectService.delete(projectId, workspaceId);

    if (!project) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Project could not be deleted \n Server Error"
          )
        );
    }

    res.clearCookie("project_id");

    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project Deleted Successfully 🌋"));
  }
);
