import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const newCodeBlock = asyncHandler(
  async (req: Request, res: Response) => {
    const name = req.body.name;
    const projectId = req.cookies.project_id;
    if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "CodeBlock name not given"));
    }
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
    const project = CodeBlockService.create(projectId, name);
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
