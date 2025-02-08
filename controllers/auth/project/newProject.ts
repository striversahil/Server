import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Project } from "../../../models/auth/project.model";
import { Workspace } from "../../../models/auth/workspace.model";
import { workspaceCookie } from "../workspace.controller";

// Creation of New Project Controller
export const newProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "User is not authenticated"));
  }

  const workspaceId = req.cookies.workspace_id;
  if (!workspaceId) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
  }

  const project = await new Project().save();

  if (!project) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, "Project could not be created \n Server Error")
      );
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Workspace does not exist with this id"));
  }

  workspace.projects.push(project._id);

  await workspace.save();

  res.cookie("project_id", project._id, workspaceCookie);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Created Successfully 🚀"));
});
