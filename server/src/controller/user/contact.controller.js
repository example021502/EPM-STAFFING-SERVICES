import { insertData } from "../../util/dbCrud";
import { successResponse, errorResponse } from "../../util/response";

export const insertContact = async (req, res) => {
  const data = req.body;

  try {
    const result = await insertData("user_contacts", data);

    return successResponse(res, "Contact insert successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Insert contact failed", 400, err);
  }
};
