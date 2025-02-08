import { Request, Response } from "express";
import { Workspace } from "../../models/auth/workspace.model";
import { User } from "../../models/auth/user.model";
import ApiResponse from "../../helper/ApiResponse";
import asyncHandler from "../../helper/asyncHandler";

const isProduction = process.env.NODE_ENV === "production";

const cookie: object = {
  // creating cookie
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days of cookie
};

export const WorkSpaceInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const WorkspaceId = req.params.workspaceId;

    if (!WorkspaceId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Redirecting to login..."));
    }

    const workspace = await Workspace.findOne({ _id: WorkspaceId });

    if (!workspace) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, {}, "Workspace could not be found try Create it")
        );
    }

    res.cookie("workspace_id", workspace._id, cookie);

    return res
      .status(200)
      .json(new ApiResponse(200, workspace, "Workspace Found and Authorized"));
  }
);

export const newWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User is not authenticated"));
    }

    const workspace = await Workspace.create({
      user: req.user._id,
    });

    if (!workspace) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Workspace could not be created \n Server Error"
          )
        );
    }

    workspace.save();

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "User could not be found \n Redirecting to login..."
          )
        );
    }
    user.workspaces = [...user.workspaces, workspace._id];
    user.save();
    res.cookie("workspace_id", workspace._id, cookie);

    return res
      .status(200)
      .json(
        new ApiResponse(200, workspace, "Workspace Created Successfully 🚀")
      );
  }
);

export const deleteWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId;
    if (!workspaceId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Workspace does not exist Create it"));
    }

    const workspace = await Workspace.findByIdAndDelete(workspaceId);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            "User could not be found \n Redirecting to login..."
          )
        );
    }
    user.workspaces = user.workspaces.filter(
      (workspace) => workspace.toString() !== workspaceId
    );
    user.save();

    res.clearCookie("workspace_id");

    if (!workspace) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "Workspace could not be deleted \n Server Error"
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, workspace, "Workspace Deleted Successfully 🌋")
      );
  }
);
