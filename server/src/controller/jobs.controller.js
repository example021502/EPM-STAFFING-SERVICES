import { createJob } from "../services/db/jobs.service.db.js";

// POST : api/jobs
export const createJobContoller = async (req, res) => {
  try {
    const data = req.body;

    const result = await createJob(data);

    // console.log(res);

    res.status(200).json({ message: "Job Create Successfully" });
  } catch (err) {
    console.log(err);
  }
};
