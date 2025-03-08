import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { workspaceCookie } from "../../auth/workspace.controller";
import ProjectService from "../../../service/project.service";

// Creation of New Project Controller
export const newProject = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = req.cookies.workspace_id;
  if (!workspaceId) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
  }

  const project = await ProjectService.create(workspaceId);

  if (!project) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, "Project could not be created \n Server Error")
      );
  }

  res.cookie("project_id", project, workspaceCookie);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Created Successfully 🚀"));
});
