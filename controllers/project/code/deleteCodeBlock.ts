import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const deleteCodeBlock = asyncHandler(
  async (req: Request, res: Response) => {
    const codeBlockId = req.params.id;
    const projectId = req.cookies.project_id;
    if (!projectId || !codeBlockId) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "CodeBlock or Project does not exist , Try Create it First"
          )
        );
    }
    const codeBlock = await CodeBlockService.delete(codeBlockId, projectId);
    if (!codeBlock) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "CodeBlock could not be deleted \n Server Error"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, codeBlock, "CodeBlock Deleted"));
  }
);
