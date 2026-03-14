import { createJob } from "../services/db/jobs.service.db.js";

// POST : api/jobs
export const createJobContoller = async (req, res) => {
  try {
    const result = await createJob(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
