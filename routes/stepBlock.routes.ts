import { Router } from "express";
import {
  addStep,
  deleteStep,
  duplicate,
  updateCode,
} from "../controllers/project/StepBlock/_stepBlock.controller";

const router = Router();
router.route("/").get(getAllCodeBlock);

router.route("/:id").get(getCodeBlock);

router.route("/").post(newCodeBlock);

router.route("/:id/name").post(updateCodeBlockName);

router.route("/:id/steps").get(getAllSteps);
router.route("/step/new").post(addStep);
router.route("/duplicate").post(duplicate);
router.route("/step/delete").post(deleteStep);
router.route("/step/code").post(updateStepCode);

router.route("/:id").delete(deleteCodeBlock);

// router.route(":componentId").put(updateComponent);

export default router;
