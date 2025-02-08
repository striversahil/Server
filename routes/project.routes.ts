import { Router } from "express";
import {
  deleteProject,
  newProject,
  ProjectInfo,
} from "../controllers/auth/project.controller";

const router = Router();

router.route("/").get(ProjectInfo);

router.route("/new").get(newProject);

router.route("/delete").get(deleteProject);

export default router;
