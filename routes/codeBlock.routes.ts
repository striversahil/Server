import { Router } from "express";
import {
  newCodeBlock,
  getCodeBlock,
  deleteCodeBlock,
  getAllCodeBlock,
  updateCodeBlockName,
  addStep,
  duplicateStep,
  deleteStep,
  updateStep,
} from "../controllers/project/codeBlock.controller";

const router = Router();
router.route("/").get(getAllCodeBlock);

router.route("/:id").get(getCodeBlock);

router.route("/").post(newCodeBlock);

router.route("/:id/name").post(updateCodeBlockName);
router.route("/step/new").post(addStep);
router.route("/step/duplicate").post(duplicateStep);
router.route("/step/delete").post(deleteStep);
router.route("/step/update").post(updateStep);

router.route("/:id").delete(deleteCodeBlock);

// router.route(":componentId").put(updateComponent);

export default router;
