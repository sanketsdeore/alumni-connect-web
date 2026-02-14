import React, { useState, useEffect } from "react";
import API from "../services/api";

const ProjectCard = ({ project, onDelete }) => {
    const [open, setOpen] = useState(false);
    const userId = Number(localStorage.getItem("id"));

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="border rounded p-4 mb-3 shadow-sm bg-white">
            <div
                className="flex justify-between cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="font-semibold">{project.title}</h3>

                    <p className="text-sm text-gray-500">
                        Created by {project.creatorName}
                    </p>

                    <p className="text-sm text-purple-700 font-medium mt-1">
                        Target: {formatCurrency(project.targetAmount)}
                    </p>

                    {userId === project.createdBy && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(project.id);
                            }}
                            className="text-red-600 text-sm mt-2"
                        >
                            Delete
                        </button>
                    )}
                </div>

                <span>{open ? "−" : "+"}</span>
            </div>

            {open && (
                <div className="mt-3 text-sm">
                    <p className="whitespace-pre-line">
                        {project.description}
                    </p>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-purple-600 mt-3 inline-block font-medium"
                        >
                            Donate Here
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

const DonationPage = () => {

    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const res = await API.get("/donations");
                if (!ignore) {
                    setProjects(res.data);
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

    const handleAddProject = async () => {
        try {
            const res = await API.post("/donations/create", {
                title,
                description,
                targetAmount,
                link
            });

            setProjects(prev => [res.data, ...prev]);

            setShowModal(false);
            setTitle("");
            setDescription("");
            setTargetAmount("");
            setLink("");

        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("Delete this project?")) return;

        try {
            await API.delete(`/donations/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="job-board h-[80vh] mt-24 m-10 p-6 bg-purple-100 rounded overflow-y-auto scrollbar-thin">

                <h1 className="text-2xl font-bold">
                    Donation Projects
                </h1>

                <p className="mt-1 text-gray-600">
                    Support meaningful initiatives started by our alumni.
                </p>

                {localStorage.getItem("role") === "alumni" && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Add Project
                    </button>
                )}

                <div className="mt-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleDeleteProject}
                        />
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h2 className="text-xl font-bold mb-4">
                            Add Project
                        </h2>

                        <input
                            type="text"
                            placeholder="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            placeholder="Project Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 rounded mb-3 h-28"
                        />

                        <input
                            type="number"
                            placeholder="Target Amount"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Donation Link (Razorpay / UPI / etc)"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAddProject}
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

export default DonationPage;
