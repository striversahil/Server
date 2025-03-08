import { Router } from "express";
import {
  addStep,
  deleteStep,
  duplicate,
  updateCode,
  getAllSteps,
  getStepBlock,
} from "../controllers/project/stepBlock/_stepBlock.controller";

const router = Router();
router.route("/getAll/:id").get(getAllSteps);

router.route("/:id").get(getStepBlock);

router.route("/").post(addStep);

// router.route("/name").post(updateCodeBlockName);

router.route("/duplicate").post(duplicate);
router.route("/code").post(updateCode);

router.route("/delete").post(deleteStep);

export default router;
