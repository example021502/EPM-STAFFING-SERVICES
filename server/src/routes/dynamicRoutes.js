import express from "express";
import {
  insertController,
  getByIdController,
  getByUserIdController,
} from "../util/controller.js";

const router = express.Router();

// BASE url : api/dr

/* 
==============================
            GET
==============================
*/
router.get("/get/:table/:id", getByIdController);
router.get("/get/user-id/:table/:user_id", getByUserIdController);

/* 
==============================
        INSERT/POST
==============================
*/
router.post("/insert/:table", insertController);

export default router;
