import { Router } from "express";
import {
  deleteProject,
  newProject,
  projectInfo,
} from "../controllers/project/project.controller";

const router = Router();

router.route("/").get(projectInfo);

router.route("/").post(newProject);

router.route("/").delete(deleteProject);

export default router;
