import express from "express";

import {
  getSkills,
  getSkill,
  search,
  graph,
} from "./controller.js";

const router = express.Router();

router.get("/skills", getSkills);

router.get("/skills/search", search);

router.get("/skills/:name", getSkill);

router.get("/graph/:name", graph);

export default router;