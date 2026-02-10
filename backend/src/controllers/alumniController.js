import prisma from "../prisma/client.js";

export const createProfile = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const { passingYear, company, experience, location, linkedin } = req.body;

        const userId = req.user.userId; // from JWT middleware

        const profile = await prisma.alumniProfile.create({
            data: {
                passingYear,
                company,
                experience,
                location,
                linkedin,
                userId
            }
        });

        res.json({ success: true, profile });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: err.message });
    }


};
