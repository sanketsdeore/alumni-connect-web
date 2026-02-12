import React, { useState, useEffect } from 'react'
import API from "../services/api";

const JobCard = ({ job, onDelete }) => {
    const [open, setOpen] = useState(false);
    const userId = Number(localStorage.getItem("id"));

    return (
        <div className="border rounded p-4 mb-3 shadow-sm bg-white">
            <div
                className="flex justify-between cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                    {userId === job.postedBy && (
                        <button
                            onClick={() => onDelete(job.id)}
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
                    <p className="whitespace-pre-line">{job.description}</p>
                    <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 mt-2 inline-block"
                    >
                        Apply Here
                    </a>
                </div>
            )}
        </div>
    );
};


const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get("/openings");
                setJobs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    const handleAddOpening = async () => {
        try {
            await API.post("/openings", {
                title,
                company,
                description,
                link
            });

            setShowModal(false);
            setTitle("");
            setCompany("");
            setDescription("");
            setLink("");

            const res = await API.get("/openings");
            setJobs(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteOpening = async (id) => {
        if (!window.confirm("Delete this opening?")) return;

        try {
            await API.delete(`/openings/${id}`);
            setJobs(prev => prev.filter(j => j.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='job-board h-[80vh] mt-24 m-10 p-6 bg-purple-100 rounded overflow-y-auto scrollbar-thin'>
                <h1 className="text-2xl font-bold">Job Board</h1>
                <p className="mt-1 text-gray-600">Explore job & internship opportunities shared by our alumni.</p>
                {localStorage.getItem("role") === "alumni" && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Add Opening
                    </button>
                )}
                <div className="mt-6">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} onDelete={handleDeleteOpening} />
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Add Opening</h2>

                        <input
                            type="text"
                            placeholder="Job Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 rounded mb-3 h-28"
                        />

                        <input
                            type="text"
                            placeholder="Application Link"
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
                                onClick={handleAddOpening}
                                className="px-4 py-2 bg-purple-600 text-white rounded"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default JobBoard
