import prisma from "../prisma/client.js";

/*
--------------------------------
Get All Events
--------------------------------
*/
export const getEvents = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id;

        const events = await prisma.event.findMany({
            include: {
                registrations: true
            },
            orderBy: { date: "asc" }
        });

        const formatted = events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            venue: event.venue,
            createdBy: event.createdBy,
            alumniOnly: event.alumniOnly,
            attendeeCount: event.registrations.length,
            isRegistered: event.registrations.some(
                r => r.userId === userId
            )
        }));

        res.json(formatted);

    } catch (err) {
        console.error("Get Events Error:", err);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};


/*
--------------------------------
Create Event
--------------------------------
*/
export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            time,
            venue,
            alumniOnly
        } = req.body;

        const userId = req.user?.userId || req.user?.id;

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                time,
                venue,
                alumniOnly: Boolean(alumniOnly),
                createdBy: userId
            }
        });

        res.status(201).json(event);

    } catch (err) {
        console.error("Create Event Error:", err);
        res.status(500).json({ message: "Failed to create event" });
    }
};


/*
--------------------------------
Register For Event
--------------------------------
*/
export const registerEvent = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        const eventId = Number(req.params.id);

        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // 🔥 Fetch user role from DB
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🔒 Alumni-only restriction
        if (event.alumniOnly && user.role !== "alumni") {
            return res.status(403).json({
                message: "Only alumni can register for this event"
            });
        }

        await prisma.eventRegistration.create({
            data: {
                userId,
                eventId
            }
        });

        res.json({ message: "Registered successfully" });

    } catch (err) {

        if (err.code === "P2002") {
            return res.status(400).json({
                message: "Already registered for this event"
            });
        }

        console.error("Register Event Error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};



/*
--------------------------------
Unregister From Event
--------------------------------
*/
export const unregisterEvent = async (req, res) => {
    try {
        const userId = req.user?.userId || req.user?.id;
        const eventId = Number(req.params.id);

        await prisma.eventRegistration.delete({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
        });

        res.json({ message: "Unregistered successfully" });

    } catch (err) {
        console.error("Unregister Error:", err);
        res.status(500).json({ message: "Failed to unregister" });
    }
};


/*
--------------------------------
Delete Event (Creator Only)
--------------------------------
*/
export const deleteEvent = async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const userId = req.user?.userId || req.user?.id;

        // Fetch event
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Fetch user role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Allow delete if:
        // - creator
        // - OR admin
        if (event.createdBy !== userId && user.role !== "admin") {
            return res.status(403).json({
                message: "Not authorized to delete this event"
            });
        }

        // Delete registrations + event (transaction)
        await prisma.$transaction([
            prisma.eventRegistration.deleteMany({
                where: { eventId }
            }),
            prisma.event.delete({
                where: { id: eventId }
            })
        ]);

        res.json({ message: "Event deleted successfully" });

    } catch (err) {
        console.error("Delete Event Error:", err);
        res.status(500).json({ message: "Delete failed" });
    }
};


