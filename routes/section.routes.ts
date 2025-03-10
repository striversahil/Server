import { Router } from "express";
import {
  newSection,
  deleteSection,
  getSection,
  getAllSections,
} from "../controllers/project/sections/_section.controller";

const router = Router();

// router.route("/").get(newSection);

router.route("/").get(getAllSections);

router.route("/").post(newSection);

router.route("/:id").get(getSection);

router.route("/delete").post(deleteSection);

// router.route("/update/").post(updateComponent);

export default router;
