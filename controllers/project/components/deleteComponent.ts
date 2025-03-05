import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/project/project.model";
import ComponentService from "../../../service/component.service";

export const deleteComponent = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.cookies.project_id;
    const { componentId } = req.body;
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

    const component = await ComponentService.delete(
      componentId as string,
      projectId as string
    );

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

    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Deleted"));
  }
);
