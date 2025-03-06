import { Router } from "express";
import {
  deleteProject,
  newProject,
  projectInfo,
  updateName,
} from "../controllers/project/project/_project.controller";

const router = Router();

router.route("/").get(projectInfo);

router.route("/").post(newProject);

router.route("/").delete(deleteProject);

router.route("/name").post(updateName);

export default router;
