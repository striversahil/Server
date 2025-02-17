import { Router } from "express";
import {
  deleteComponent,
  getComponents,
  newComponent,
  updateComponent,
} from "../controllers/project/component.controller";

const router = Router();

router.route("/").get(getComponents);

router.route("/new").get(newComponent);

router.route("/delete/:componentId").get(deleteComponent);

router.route("/update/:componentId").put(updateComponent);

export default router;
