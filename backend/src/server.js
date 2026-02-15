import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://alumni-connect-web.vercel.app",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/openings", jobRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
