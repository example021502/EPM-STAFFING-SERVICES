const URL = import.meta.env.VITE_URL;

// POST jobs
export const getJobs = async (data) => {
  const res = await fetch(`${URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
