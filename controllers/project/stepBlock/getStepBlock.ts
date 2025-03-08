import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import StepBlockService from "../../../service/stepblock.service";

export const getStepBlock = asyncHandler(
  async (req: Request, res: Response) => {
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

    console.log("Get Step Block");

    const codeBlock = await StepBlockService.getById(id as string);
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
    return res.status(200).json(new ApiResponse(200, codeBlock, "Success"));
  }
);
