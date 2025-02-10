import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/auth/project.model";

// It will return all the components of the project in Array format so to render in Frontend when User fetches this

export const getComponents = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.cookies.project_id;
    if (!projectId) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "Project does not exist , Try Create it First"
          )
        );
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "Project could not be found \n Redirecting to login..."
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, project.components, "All Components Fetched"));
  }
);
