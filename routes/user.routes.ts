import mongoose from "mongoose";

import { signIN, registerUser } from "../controllers/auth/user.controller";
import {
  Testing,
  newWorkspace,
} from "../controllers/auth/workspace.controller";

import { Request, Response, Router } from "express";
import { authenticate, authController } from "../middleware/auth.middleware";
import { User } from "../models/auth/user.model";
import asyncHandler from "../helper/asyncHandler";

const router = Router();

// Login Routes
router.route("/signup").post(registerUser);
router.route("/signin").post(signIN);

// WorkSpace Routes
router.route("/workspace").get(newWorkspace);
router.route("/workspace/:workspaceId").post(Testing);

// Project Routes
router.route("/project/:projectId").post(Testing);

// Middleware Testing
router.route("/auth").get(authController);

router.route("/").get(
  asyncHandler(async (req: Request, res: Response) => {
    const users = await User.findById(req.user._id);
    res.status(200).json(users);
  })
);
export default router;
