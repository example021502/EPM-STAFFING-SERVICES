import {
  insertData,
  updateDataByUserId,
  getDataByUserId,
} from "../../util/dbCrud.js";
import { successResponse, errorResponse } from "../../util/response.js";

// INSERT: company infomation
export const insertCompany = async (req, res) => {
  const data = req.body;

  try {
    const result = await insertData("company_info", data);

    return successResponse(
      res,
      "Insert company information successfully",
      result,
    );
  } catch (err) {
    return errorResponse(res, "Failed to insert company info", 500, err);
  }
};

// UPDATE: company information
export const updateCompany = async (req, res) => {
  const user_id = req.params.user_id;
  const data = req.body;

  try {
    const result = await updateDataByUserId(user_id, "company_info", data);

    return successResponse(res, "Update company successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Failed to update company info", 500, err);
  }
};

// GET: company information
export const getCompany = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await getDataByUserId(user_id, "company_info");

    return successResponse(res, "Fetch company data successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Failed to fetch company info", 500, err);
  }
};
