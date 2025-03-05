import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import ComponentService from "../../../service/component.service";

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
    const components = await ComponentService.getAll(projectId as string);

    if (!components) {
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
      .json(new ApiResponse(200, components, "All Components Fetched"));
  }
);
