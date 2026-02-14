import prisma from "../prisma/client.js";

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.donationProject.findMany({
            orderBy: { createdAt: "desc" }
        });

        const userIds = [...new Set(projects.map(p => p.createdBy))];

        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true }
        });

        const projectsWithNames = projects.map(project => {
            const creator = users.find(u => u.id === project.createdBy);
            return {
                ...project,
                creatorName: creator ? creator.name : "Alumni"
            };
        });

        res.json(projectsWithNames);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
};


// Create project (no role check)
export const createProject = async (req, res) => {
    try {
        const { title, description, targetAmount, link } = req.body;

        const project = await prisma.donationProject.create({
            data: {
                title,
                description,
                targetAmount: parseFloat(targetAmount),
                link,
                createdBy: Number(req.user.userId || req.user.id)
            }
        });

        res.status(201).json(project);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create project" });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.donationProject.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Project deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete project" });
    }
};


