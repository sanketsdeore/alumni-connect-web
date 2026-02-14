import React, { useState, useEffect } from "react";
import API from "../services/api";

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [alumniOnly, setAlumniOnly] = useState(false);

    const userId = Number(localStorage.getItem("id"));
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await API.get("/events");
                if (!ignore) {
                    setEvents(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };

    }, []);

    const handleCreateEvent = async () => {
        try {
            const res = await API.post("/events", {
                title,
                description,
                date,
                time,
                venue,
                alumniOnly
            });

            setEvents(prev => [res.data, ...prev]);

            setShowModal(false);
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setVenue("");
            setAlumniOnly(false);

        } catch (err) {
            console.error(err);
        }
    };

    const toggleRegistration = async (event) => {
    try {

        if (event.isRegistered) {

            await API.delete(`/events/${event.id}/register`);

            setEvents(prev =>
                prev.map(e =>
                    e.id === event.id
                        ? {
                            ...e,
                            isRegistered: false,
                            attendeeCount: Math.max((e.attendeeCount || 0) - 1, 0)
                        }
                        : e
                )
            );

        } else {

            await API.post(`/events/${event.id}/register`);

            setEvents(prev =>
                prev.map(e =>
                    e.id === event.id
                        ? {
                            ...e,
                            isRegistered: true,
                            attendeeCount: (e.attendeeCount || 0) + 1
                        }
                        : e
                )
            );
        }

    } catch (err) {
        alert(err.response?.data?.message || "Action failed");
    }
};

    const handleDeleteEvent = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            await API.delete(`/events/${id}`);
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="job-board h-[80vh] mt-24 m-10 p-6 bg-purple-100 rounded overflow-y-auto scrollbar-thin">

                <h1 className="text-2xl font-bold">Upcoming Events</h1>
                <p className="mt-1 text-gray-600">
                    Join upcoming community and alumni events.
                </p>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Create Event
                </button>

                <div className="mt-6 space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow p-5 relative">

                            {event.alumniOnly && (
                                <span className="absolute top-3 right-3 bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                                    Alumni Only
                                </span>
                            )}

                            <h3 className="font-semibold text-lg">{event.title}</h3>

                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(event.date).toLocaleDateString()} • {event.time}
                            </p>

                            <p className="text-sm text-gray-500">
                                📍 {event.venue}
                            </p>

                            <p className="mt-3 text-sm">{event.description}</p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm font-medium text-purple-700">
                                    {event.attendeeCount} Attending
                                </span>

                                <div className="flex gap-2">

                                    {userId === event.createdBy && (
                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="text-red-600 text-sm"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {(!event.alumniOnly || userRole === "alumni") && (
                                        <button
                                            onClick={() => toggleRegistration(event)}
                                            className={`px-4 py-1 rounded text-sm ${
                                                event.isRegistered
                                                    ? "bg-red-500 text-white"
                                                    : "bg-purple-600 text-white"
                                            }`}
                                        >
                                            {event.isRegistered ? "Unregister" : "Register"}
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Create Event</h2>

                        <input
                            type="text"
                            placeholder="Event Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 rounded mb-3 h-24"
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Time (e.g. 6:00 PM)"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <label className="flex items-center gap-2 text-sm mb-3">
                            <input
                                type="checkbox"
                                checked={alumniOnly}
                                onChange={(e) => setAlumniOnly(e.target.checked)}
                            />
                            Alumni Only Event
                        </label>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreateEvent}
                                className="px-4 py-2 bg-purple-600 text-white rounded"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventsPage;
