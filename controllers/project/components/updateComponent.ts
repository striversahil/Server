import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import ComponentService from "../../../service/component.service";

export const updateComponent = asyncHandler(
  async (req: Request, res: Response) => {
    const { metadata, payload } = req.body;
    if (!metadata || !payload) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }

    const component = await ComponentService.updateComponent(metadata, payload);
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
    return res
      .status(200)
      .json(new ApiResponse(200, component, "Component Updated Successfully"));
  }
);
