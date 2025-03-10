import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { Component } from "../../../models/project/component.model";
import { Project } from "../../../models/project/project.model";
import ComponentService from "../../../service/component.service";

// Will Be Post Request as require Component Configurations

export const newComponent = asyncHandler(
  async (req: Request, res: Response) => {
    const { metadata, payload } = req.body;
    if (!metadata || !payload) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }

    const component = await ComponentService.create(
      metadata.section_id as string,
      metadata,
      payload
    );
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

    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Added"));
  }
);
