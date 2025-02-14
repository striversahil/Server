import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "@/service/codeblock.service";

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
    const project = CodeBlockService.createCodeBlock(projectId);
    if (!project) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Project could not be created \n Server Error"
          )
        );
    }

    return res.status(200).json(new ApiResponse(200, project, "Success"));
  }
);
