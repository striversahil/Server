import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import SectionService from "../../../service/section.service";

export const newSection = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.cookies.project_id;
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

  const project = await SectionService.create(projectId);

  if (!project) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, {}, "Project could not be updated \n Server Error")
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Updated Successfully"));
});
