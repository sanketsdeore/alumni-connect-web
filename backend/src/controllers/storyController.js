import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    const story = await prisma.story.create({
      data: {
        title,
        content,
        authorId
      }
    });

    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating story" });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const storyId = Number(req.params.id);
    const userId = req.user?.userId || req.user?.id;

    const story = await prisma.story.findUnique({
      where: { id: storyId }
    });

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Fetch user role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Allow delete if author OR admin
    if (story.authorId !== userId && user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized to delete this story"
      });
    }

    await prisma.story.delete({
      where: { id: storyId }
    });

    res.json({ message: "Story deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting story" });
  }
};


export const getStories = async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        id: "desc"
      }
    });

    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stories" });
  }
};
