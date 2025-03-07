import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const updateCodeBlockName = asyncHandler(
  async (req: Request, res: Response) => {
    const { metadata, payload } = req.body;
    if (!metadata || !payload) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Missing Information ! Please Provide Complete Information"
          )
        );
    }
    const codeBlock = await CodeBlockService.updateName(
      metadata._id,
      payload.name
    );
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
      .json(new ApiResponse(200, codeBlock, "CodeBlock Updated"));
  }
);
