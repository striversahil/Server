import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";

export const newCodeBlock = asyncHandler(
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
          new ApiResponse(401, {}, "Project could not be found try Create it")
        );
    }
  }
);
