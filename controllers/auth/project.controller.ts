import { Request, Response } from "express";
import asyncHandler from "../../helper/asyncHandler";
import ApiResponse from "../../helper/ApiResponse";
import { Project } from "../../models/auth/project.model";

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
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Found and Authorized"));
});

// Creation of New Project Controller
export const newProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User is not authenticated"));
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

  project.save();

  return res.status(200).json({
    message: "Project Created Successfully 🚀",
    project: project,
  });
});
