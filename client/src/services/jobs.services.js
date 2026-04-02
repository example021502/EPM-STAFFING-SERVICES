const URL = import.meta.env.VITE_URL;

// POST: create jobs
export const postJobs = async (data) => {
  const res = await fetch(`${URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

// GET : fetch jobs by user id
export const getJobsByUserID = async (user_id) => {
  const res = await fetch(`${URL}/api/jobs/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = res.json();

  return data;
};
// UPDATE (PUT) : update job by job id
export const updateByJobId = async (job_id, data) => {
  try {
    const res = await fetch(`${URL}/api/jobs/update/${job_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    err;
    return err;
  }
};

// DELETE : delete job by job id
export const deleteByJobId = async (job_id) => {
  try {
    const res = await fetch(`${URL}/api/jobs/${job_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (err) {
    return err;
  }
};
