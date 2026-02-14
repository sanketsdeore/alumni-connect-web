import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getOpenings = async (req, res) => {
  try {
    const openings = await prisma.opening.findMany({
      orderBy: { id: "desc" }
    });

    res.json(openings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching openings" });
  }
};

export const createOpening = async (req, res) => {
  try {
    const { title, company, description, location, link } = req.body;
    const postedBy = req.user.userId;

    const opening = await prisma.opening.create({
      data: { title, company, description, location, link, postedBy }
    });

    res.json(opening);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating opening" });
  }
};

export const deleteOpening = async (req, res) => {
  try {
    const openingId = Number(req.params.id);
    const userId = req.user?.userId || req.user?.id;

    const opening = await prisma.opening.findUnique({
      where: { id: openingId }
    });

    if (!opening) {
      return res.status(404).json({ message: "Opening not found" });
    }

    // Fetch user role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Allow delete if poster OR admin
    if (opening.postedBy !== userId && user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.opening.delete({
      where: { id: openingId }
    });

    res.json({ message: "Opening deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting opening" });
  }
};

