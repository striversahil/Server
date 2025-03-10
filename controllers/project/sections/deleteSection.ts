import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import SectionService from "../../../service/section.service";

export const deleteSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { project_id } = req.cookies;
    const { metadata } = req.body;
    if (!metadata) {
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
    const section = await SectionService.delete(
      metadata.section_id,
      project_id
    );
    if (!section) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Section could not be deleted \n Server Error"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, section, "Section Deleted Successfully 🚀"));
  }
);
