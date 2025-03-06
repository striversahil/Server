import { Request, Response } from "express";
import asyncHandler from "../../../../helper/asyncHandler";
import ApiResponse from "../../../../helper/ApiResponse";
import CodeBlockService from "../../../../service/codeblock.service";

export const deleteStep = asyncHandler(async (req: Request, res: Response) => {
  const { id, step } = req.body;
  if (!id || (step !== 0 && !step)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
  }
  const codeBlock = await CodeBlockService.deleteStep(id, step);
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
