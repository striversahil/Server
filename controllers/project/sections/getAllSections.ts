import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import SectionService from "../../../service/section.service";

export const getAllSections = asyncHandler(
  async (req: Request, res: Response) => {
    const { project_id } = req.cookies;
    if (!project_id) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "Project does not exist , Try Create it First"
          )
        );
    }
    const sections = await SectionService.getAll(project_id as string);
    if (!sections) {
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
    return res
      .status(200)
      .json(new ApiResponse(200, sections, "Sections Fetched Successfully 🚀"));
  }
);
