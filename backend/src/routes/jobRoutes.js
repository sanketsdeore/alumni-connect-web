import express from "express";
import { getOpenings, createOpening, deleteOpening } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOpenings);
router.post("/", authMiddleware, createOpening);
router.delete("/:id", authMiddleware, deleteOpening);

export default router;