import express from "express";
import { createProfile } from "../controllers/alumniController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Alumni route working");
});

router.post("/profile", authMiddleware, createProfile);

export default router;
