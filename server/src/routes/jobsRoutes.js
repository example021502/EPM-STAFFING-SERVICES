import express from "express";
import { createJobContoller } from "../controller/jobs.controller.js";

const router = express.Router();

// Routes /api

// POST -> post job
router.post("", createJobContoller);

export default router;
