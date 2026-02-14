import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

/*
--------------------------------
Get Profile
--------------------------------
*/
export const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                alumniProfile: true
            }
        });

        res.json(user);

    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};


/*
--------------------------------
Update Profile
--------------------------------
*/
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id;

        const {
            name,
            email,
            password,
            passingYear,
            company,
            experience,
            location,
            linkedin
        } = req.body;

        const updateData = {
            name,
            email
        };

        // 🔐 Update password if provided
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        // 🔥 If alumni, update alumniProfile
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (user.role === "alumni") {
            await prisma.alumniProfile.upsert({
                where: { userId },
                update: {
                    passingYear: Number(passingYear),
                    company,
                    experience: Number(experience),
                    location,
                    linkedin
                },
                create: {
                    userId,
                    passingYear: Number(passingYear),
                    company,
                    experience: Number(experience),
                    location,
                    linkedin
                }
            });
        }

        res.json({ message: "Profile updated successfully" });

    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ message: "Update failed" });
    }
};
