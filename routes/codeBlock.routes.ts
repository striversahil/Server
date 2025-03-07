import { Router } from "express";
import {
  newCodeBlock,
  getCodeBlock,
  deleteCodeBlock,
  getAllCodeBlock,
  updateCodeBlockName,
} from "../controllers/project/codeBlock/_codeBlock.controller";

const router = Router();
router.route("/").get(getAllCodeBlock);

router.route("/:id").get(getCodeBlock);

router.route("/").post(newCodeBlock);

router.route("/name").post(updateCodeBlockName);

router.route("/:id").delete(deleteCodeBlock);

export default router;
