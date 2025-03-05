import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const getCodeBlock = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Get CodeBlock");
    const codeBlockId = req.params.id;
    const projectId = req.cookies.project_id;

    if (!codeBlockId) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
    }

    if (!projectId) {
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

    const codeBlock = await CodeBlockService.getById(codeBlockId);

    if (!codeBlock) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "CodeBlock could not be found \n Server Error"
          )
        );
    }
    return res.status(200).json(new ApiResponse(200, codeBlock, "Success"));
  }
);
