import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Project } from "../../../models/auth/project.model";
import { Workspace } from "../../../models/auth/workspace.model";
import { workspaceCookie } from "../workspace.controller";

// Get Project Controller Info
export const projectInfo = asyncHandler(async (req: Request, res: Response) => {
  const ProjectId = req.cookies.project_id;
  if (!ProjectId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Project does not exist Create it First"));
  }

  const project = await Project.findOne({ _id: ProjectId });

  if (!project) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, {}, "Project could not be found try Create it")
      );
  }

  // Adding this so that everytime user refreshes the page, the cookie is updated
  res.cookie("project_id", ProjectId, workspaceCookie);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Found and Authorized"));
});
