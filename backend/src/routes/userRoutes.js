import express from "express";
import { getAlumni } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/alumni", authMiddleware, getAlumni);

export default router;