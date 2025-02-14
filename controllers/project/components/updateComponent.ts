import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/project/project.model";

export const updateComponent = asyncHandler(
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
    const { name, payload, configuration } = req.body;
    if (!name || !payload || !configuration) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }
    const component = await Component.findByIdAndUpdate(
      componentId,
      { name: name, payload: payload, configuration: configuration },
      { new: true } //It returns the updated/new document
    );
    if (!component) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Component could not be updated \n Server Error"
          )
        );
    }
    const project = await Project.findById(req.cookies.project_id);
    if (!project) {
      return res
        .status(500)
        .json(
          new ApiResponse(500, {}, "Project could not be found \n Server Error")
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Updated Successfully"));
  }
);
