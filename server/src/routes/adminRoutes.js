import express from "express";
import {
  unfollowUserController,
  removeListController,
} from "../controller/admin.contoller.js";

const router = express.Router();

// BASE routes = api/admin
// This is for testing only
router.delete("/unfollow/:table", unfollowUserController);
router.delete("/remove-list/:table", removeListController);

export default router;
