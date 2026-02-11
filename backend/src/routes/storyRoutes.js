import express from "express";
import { getStories, createStory, deleteStory } from "../controllers/storyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStories);
router.post("/", authMiddleware, createStory);
router.delete("/:id", authMiddleware, deleteStory);

export default router;
