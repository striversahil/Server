import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import StepBlockService from "../../../service/stepblock.service";

export const getAllSteps = asyncHandler(async (req: Request, res: Response) => {
  console.log("Get All Steps");

  const { id } = req.params;
  // const { metadata, payload } = req.body;
  // if (!metadata || !payload) {
  //   return res
  //     .status(400)
  //     .json(
  //       new ApiResponse(
  //         400,
  //         {},
  //         "Missing Information ! Please Provide Complete Information"
  //       )
  //     );
  // }
  const codeBlock = await StepBlockService.getAll(id as string);
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
