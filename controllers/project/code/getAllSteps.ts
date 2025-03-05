import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const getAllSteps = asyncHandler(async (req: Request, res: Response) => {
  const codeBlockId = req.params.id;
  if (!codeBlockId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
  }
  const codeBlock = await CodeBlockService.getAllSteps(codeBlockId);
  if (!codeBlock) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          "CodeBlock could not be fetched \n Server Error"
        )
      );
  }
  return res.status(200).json(new ApiResponse(200, codeBlock, ""));
});
