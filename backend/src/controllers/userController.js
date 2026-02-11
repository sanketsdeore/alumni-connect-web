import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAlumni = async (req, res) => {
  try {
    const userId = req.user.userId;

    const alumni = await prisma.alumniProfile.findMany({
      where: {
        NOT: { userId: userId }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(alumni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching alumni" });
  }
};
