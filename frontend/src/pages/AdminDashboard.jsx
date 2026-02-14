import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const TabButton = ({ name, label, activeTab, setActiveTab }) => {
    return (
        <button
            onClick={() => setActiveTab(name)}
            className={`px-4 py-2 rounded ${
                activeTab === name
                    ? "bg-purple-600 text-white"
                    : "bg-white border"
            }`}
        >
            {label}
        </button>
    );
};

const SectionCard = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
};

const AdminDashboard = () => {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [activeTab, setActiveTab] = useState("events");

    const [events, setEvents] = useState([]);
    const [projects, setProjects] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        if (role !== "admin") {
            navigate("/home", { replace: true });
        }
    }, [role, navigate]);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const e = await API.get("/events");
                const p = await API.get("/donations");
                const j = await API.get("/openings");
                const s = await API.get("/stories");

                if (!ignore) {
                    setEvents(e.data);
                    setProjects(p.data);
                    setJobs(j.data);
                    setStories(s.data);
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

    const handleDelete = async (endpoint, id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await API.delete(`${endpoint}/${id}`);

            if (endpoint === "/events") {
                setEvents(prev => prev.filter(item => item.id !== id));
            }

            if (endpoint === "/donations") {
                setProjects(prev => prev.filter(item => item.id !== id));
            }

            if (endpoint === "/openings") {
                setJobs(prev => prev.filter(item => item.id !== id));
            }

            if (endpoint === "/stories") {
                setStories(prev => prev.filter(item => item.id !== id));
            }

        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-purple-100 p-10">

            <div className="flex justify-between items-center bg-white p-4 rounded shadow">
                <h1 className="text-2xl font-bold text-purple-800">
                    Admin Control Panel
                </h1>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-purple-700 hover:underline"
                    >
                        Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <p className="mt-4 text-gray-600">
                Manage and moderate platform activities.
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">
                <TabButton
                    name="events"
                    label="Events"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabButton
                    name="projects"
                    label="Donations"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabButton
                    name="jobs"
                    label="Jobs"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabButton
                    name="stories"
                    label="Stories"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>

            {activeTab === "events" && (
                <SectionCard title="All Events">
                    {events.map(event => (
                        <div
                            key={event.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(event.date).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete("/events", event.id)}
                                className="text-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </SectionCard>
            )}

            {activeTab === "projects" && (
                <SectionCard title="Donation Projects">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div>
                                <p className="font-medium">{project.title}</p>
                                <p className="text-sm text-gray-500">
                                    Target: ₹{project.targetAmount}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete("/donations", project.id)}
                                className="text-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </SectionCard>
            )}

            {activeTab === "jobs" && (
                <SectionCard title="Job Openings">
                    {jobs.map(job => (
                        <div
                            key={job.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div>
                                <p className="font-medium">{job.title}</p>
                                <p className="text-sm text-gray-500">
                                    {job.company}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete("/openings", job.id)}
                                className="text-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </SectionCard>
            )}

            {activeTab === "stories" && (
                <SectionCard title="Success Stories">
                    {stories.map(story => (
                        <div
                            key={story.id}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div>
                                <p className="font-medium">{story.title}</p>
                            </div>

                            <button
                                onClick={() => handleDelete("/stories", story.id)}
                                className="text-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </SectionCard>
            )}

        </div>
    );
};

export default AdminDashboard;
