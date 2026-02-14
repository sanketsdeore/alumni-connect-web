import express from "express";
import {
    getEvents,
    createEvent,
    registerEvent,
    unregisterEvent,
    deleteEvent
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getEvents);
router.post("/", authMiddleware, createEvent);
router.post("/:id/register", authMiddleware, registerEvent);
router.delete("/:id/register", authMiddleware, unregisterEvent);
router.delete("/:id", authMiddleware, deleteEvent);


export default router;
