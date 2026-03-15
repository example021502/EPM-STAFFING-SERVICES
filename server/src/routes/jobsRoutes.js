import express from "express";
import {
  createJobContoller,
  getJobsByUserIdController,
} from "../controller/jobs.controller.js";

const router = express.Router();

// Routes /api/jobs

// POST -> create job
router.post("", createJobContoller);

// GET ->
router.get("/:user_id", getJobsByUserIdController);

export default router;
