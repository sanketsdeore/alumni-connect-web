import express from "express";
import {
    createProject,
    getAllProjects,
    deleteProject
} from "../controllers/donationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/create", authMiddleware, createProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
