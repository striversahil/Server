import { Router } from "express";
import {
  deleteComponent,
  getComponents,
  newComponent,
  updateComponent,
} from "../controllers/project/component.controller";

const router = Router();

router.route("/").get(getComponents);

router.route("/").post(newComponent);

router.route("/delete").post(deleteComponent);

router.route("/update/").post(updateComponent);

export default router;
