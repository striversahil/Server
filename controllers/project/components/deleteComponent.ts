import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/project/project.model";

export const deleteComponent = asyncHandler(
  async (req: Request, res: Response) => {
    const componentId = req.params.componentId;
    if (!componentId) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "Component does not exist , Try Create it First"
          )
        );
    }

    const component = await Component.findByIdAndDelete(componentId);

    if (!component) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be deleted \n Server Error"
          )
        );
    }

    const project = await Project.findById(req.cookies.project_id);
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
    project.components = project.components.filter(
      (component) => component.toString() !== componentId
    );
    project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Deleted"));
  }
);
