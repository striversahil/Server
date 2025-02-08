import mongoose from "mongoose";

import {
  signIN,
  registerUser,
  UserInfo,
} from "../controllers/auth/user.controller";
import {
  newWorkspace,
  WorkSpaceInfo,
} from "../controllers/auth/workspace.controller";

import { Request, Response, Router } from "express";
import { authenticate, authController } from "../middleware/auth.middleware";
import { newProject } from "../controllers/auth/project.controller";

const router = Router();

router.route("/").get(authenticate, UserInfo);

// Login Routes
router.route("/signup").post(registerUser);
router.route("/signin").post(signIN);

// WorkSpace Routes
router.route("/workspace/:workspaceId").get(authenticate, WorkSpaceInfo);
router.route("/workspace").get(authenticate, newWorkspace);

// Project Routes
router.route("/project/:projectId").post();
router.route("/workspace/:workspaceId/project").get(authenticate, newProject);

// Middleware Testing
router.route("/auth").get(authenticate, authController);

export default router;
