import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import { workspaceCookie } from "../../../controllers/auth/workspace.controller";
import ProjectService from "../../../service/project.service";

export const updateName = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.cookies.project_id;
  const name = req.body.name;
  if (!projectId || !name) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, "Project or Name not given with Params...")
      );
  }
  const project = await ProjectService.updateName(projectId, name);
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
