import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import SectionService from "../../../service/section.service";

export const getSection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
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
  const section = await SectionService.getById(id as string);
  if (!section) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, "Section could not be updated \n Server Error")
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, section, "Section Fetched Successfully 🚀"));
});
