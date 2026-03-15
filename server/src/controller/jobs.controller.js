import { createJob, getJobsByUserId } from "../services/db/jobs.service.db.js";

// POST : api/jobs -> create jobs
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

// GET: api/jobs/:user_id -> get jobs by user id
export const getJobsByUserIdController = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await getJobsByUserId(user_id);

    res.status(201).json({
      success: true,
      message: "Fetch jobs by user id successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
