import { Request, Response } from "express";
import asyncHandler from "../../helper/asyncHandler";
import ApiResponse from "../../helper/ApiResponse";
import { Project } from "../../models/auth/project.model";
import { Workspace } from "../../models/auth/workspace.model";
import mongoose from "mongoose";

const isProduction = process.env.NODE_ENV === "production";

const cookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 15,
};

// Get Project Controller Info
export const ProjectInfo = asyncHandler(async (req: Request, res: Response) => {
  const ProjectId = req.params.projectId;
  if (!ProjectId) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Redirecting to login..."));
  }

  const project = await Project.findOne({ _id: ProjectId });

  if (!project) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, {}, "Project could not be found try Create it")
      );
  }

  res.cookie("project_id", ProjectId, cookie);

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Found and Authorized"));
});

// Creation of New Project Controller
export const newProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "User is not authenticated"));
  }

  const workspaceId = req.params.workspaceId;
  if (!workspaceId) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
  }

  const project = await Project.create({
    user: req.user._id,
  });

  if (!project) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, "Project could not be created \n Server Error")
      );
  }

  const workspace = await Workspace.findById(req.user._id);
  if (!workspace) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Workspace does not exist with this id"));
  }

  workspace.projects.push(project._id);

  await workspace.save();

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Created Successfully 🚀"));
});

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    if (!projectId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Project does not exist Create it"));
    }

    const project = await Project.findByIdAndDelete(projectId);

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

    const workspace = await Workspace.findById(req.cookies.workspace_id);
    if (!workspace) {
      return res
        .status(401)
        .json(
          new ApiResponse(401, {}, "Workspace does not exist with this id")
        );
    }

    workspace.projects = workspace.projects.filter(
      (project) => project.toString() !== projectId
    );

    res.clearCookie("project_id");
    workspace.save();

    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project Deleted Successfully 🌋"));
  }
);
