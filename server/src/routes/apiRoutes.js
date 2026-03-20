import express from "express";
import jobRoutes from "./jobsRoutes.js";
import usersRoutes from "./userRoutes.js";
import { createController } from "../util/controller.js";

const router = express.Router();

// BASE route: /api

// user routes
router.use("/users", usersRoutes);

// jobs routes
router.use("/jobs", jobRoutes);

export default router;
