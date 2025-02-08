import { Request, Response } from "express";
import asyncHandler from "../../helper/asyncHandler";
import ApiResponse from "../../helper/ApiResponse";
import { Component } from "../../models/project/component.model";
import { Project } from "../../models/auth/project.model";

// Will Be Post Request as require Component Configuration

export const newComponent = asyncHandler(
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

    const { name, payload, configuration } = req.body;
    if (!name || !payload || !configuration) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }

    const component = await Component.create({
      name: name,
      payload: payload,
      configuration: configuration,
    });
    if (!component) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be created \n Server Error"
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
    project.components.push(component._id);
    project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Added"));
  }
);
