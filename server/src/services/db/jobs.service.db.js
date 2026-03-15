import db from "../../config/db.js";

// CREATE Job
export const createJob = async (jobData) => {
  const data = jobData;

  try {
    const result =
      await db`INSERT INTO jobs (active, urgent, job_name, job_type, salary_min, salary_max, experience_years, max_applications, deadline, description, user_id) VALUES (${data.active}, ${data.urgent}, ${data.job_name}, ${data.job_type}, ${data.salary_min}, ${data.salary_max}, ${data.experience_years}, ${data.max_applications}, ${data.deadline}, ${data.description}, ${data.user_id}) RETURNING *`;

    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET jobs by user_id

export const getJobsByUserId = async (user_id) => {
  try {
    const res = await db`SELECT * FROM jobs WHERE user_id = ${user_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};
