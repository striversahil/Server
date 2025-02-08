import { Router } from "express";
import {
  deleteProject,
  newProject,
  projectInfo,
} from "../controllers/auth/project.controller";

const router = Router();

router.route("/").get(projectInfo);

router.route("/new").get(newProject);

router.route("/delete").get(deleteProject);

export default router;
