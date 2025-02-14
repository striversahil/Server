import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Project } from "../../../models/project/project.model";
import { Workspace } from "../../../models/workspace/workspace.model";
import { workspaceCookie } from "../workspace.controller";

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.cookies.project_id;
    if (!projectId) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Project does not exist Create it"));
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
