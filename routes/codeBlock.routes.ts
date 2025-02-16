import { Router } from "express";
import {
  newCodeBlock,
  getCodeBlock,
  deleteCodeBlock,
} from "../controllers/project/codeBlock.controller";

const router = Router();

router.route("/:id").get(getCodeBlock);

router.route("/").post(newCodeBlock);

router.route("/:id").delete(deleteCodeBlock);

// router.route(":componentId").put(updateComponent);

export default router;
