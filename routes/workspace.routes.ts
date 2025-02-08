import { Router } from "express";
import {
  deleteWorkspace,
  newWorkspace,
  WorkSpaceInfo,
} from "../controllers/auth/workspace.controller";

const router = Router();

// WorkSpace Routes
router.route("/").get(WorkSpaceInfo);

router.route("/new").get(newWorkspace);

router.route("/delete").get(deleteWorkspace);

export default router;
