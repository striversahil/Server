import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const addStep = asyncHandler(async (req: Request, res: Response) => {
  const codeBlockId = req.params.id;
  const step = {
    name: "JavaScrip",
    code: 'console.log("Hello World")',
    language: "javascript",
    output: "Hello World",
  };
  if (!codeBlockId) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
  }
  if (!step) {
    return res.status(400).json(new ApiResponse(400, {}, "Step not given"));
  }
  const codeBlock = await CodeBlockService.addStep(codeBlockId, step);
  if (!codeBlock) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          "CodeBlock could not be updated \n Server Error"
        )
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, codeBlock, "CodeBlock Updated Successfully"));
});
