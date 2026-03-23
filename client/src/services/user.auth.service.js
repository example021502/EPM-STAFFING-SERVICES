const API_ROUTES = import.meta.env.VITE_URL;

export const createAccount = async (data) => {
  try {
    const result = await fetch(`${API_ROUTES}/api/auth/create_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log(result);
  } catch (err) {}
};
