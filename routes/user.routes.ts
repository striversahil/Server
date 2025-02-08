import { Router } from "express";
import {
  signIN,
  registerUser,
  UserInfo,
} from "../controllers/auth/user.controller";

import { authenticate, authController } from "../middleware/auth.middleware";

const router = Router();

router.route("/").get(authenticate, UserInfo);

router.route("/signup").post(registerUser);

router.route("/signin").post(signIN);

// Middleware Testing
router.route("/auth").get(authenticate, authController);

export default router;
