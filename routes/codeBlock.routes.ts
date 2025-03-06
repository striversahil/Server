import { Router } from "express";
import {
  newCodeBlock,
  getCodeBlock,
  deleteCodeBlock,
  getAllCodeBlock,
  getAllSteps,
  updateCodeBlockName,
  addStep,
  duplicateStep,
  deleteStep,
  updateStep,
  updateStepCode,
} from "../controllers/project/codeBlock.controller";

const router = Router();
router.route("/").get(getAllCodeBlock);

router.route("/:id").get(getCodeBlock);

router.route("/").post(newCodeBlock);

router.route("/:id/name").post(updateCodeBlockName);

router.route("/:id/steps").get(getAllSteps);
router.route("/step/new").post(addStep);
router.route("/step/duplicate").post(duplicateStep);
router.route("/step/delete").post(deleteStep);
router.route("/step/update").post(updateStep);
router.route("/step/code").post(updateStepCode);

router.route("/:id").delete(deleteCodeBlock);

// router.route(":componentId").put(updateComponent);

export default router;
