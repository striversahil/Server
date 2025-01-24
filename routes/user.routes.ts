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

const router = Router();

router.route("/").get(UserInfo);

// Login Routes
router.route("/signup").post(registerUser);
router.route("/signin").post(signIN);

// WorkSpace Routes
router.route("/workspace/:workspaceId").get(WorkSpaceInfo);
router.route("/workspace").get(newWorkspace);

// Project Routes
router.route("/project/:projectId").post();

// Middleware Testing
router.route("/auth").get(authController);

export default router;
