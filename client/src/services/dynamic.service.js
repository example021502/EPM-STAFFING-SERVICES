const API_ROUTES = import.meta.env.VITE_URL;

export const getByIdService = async (URL, table, id) => {
  console.log("URL: ", URL, "table: ", table, "id: ", id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getByUserIdService = async (URL, table, id) => {
  console.log("getByUserIdService", "URL: ", URL, "table: ", table, "id: ", id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
