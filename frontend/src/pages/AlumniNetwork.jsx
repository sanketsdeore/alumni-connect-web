import React, { useState, useEffect } from 'react'
import API from "../services/api";

const AlumniCard = ({ alumni }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border rounded p-4 mb-3 shadow-sm bg-white">
            <div
                className="flex justify-between cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="font-semibold">{alumni.user.name}</h3>
                    <p className="text-sm text-gray-500">{alumni.company}</p>
                </div>
                <span>{open ? "−" : "+"}</span>
            </div>

            {open && (
                <div className="mt-3 text-sm">
                    <p>Passing Year: {alumni.passingYear}</p>
                    <p>Location: {alumni.location}</p>
                    <p>Experience: {alumni.experience} years</p>

                    <div className="flex gap-3 mt-2">
                        <a href={alumni.linkedin} className="text-blue-600">LinkedIn</a>
                        <a href={`mailto:${alumni.user.email}`} className="text-blue-600">Email</a>
                    </div>
                </div>
            )}
        </div>
    );
};

const StoryCard = ({ story, onDelete }) => {
    const id = JSON.parse(localStorage.getItem("id"));

    return (
        <div className="border rounded p-4 mb-3 my-4 shadow-sm bg-white">
            <h3 className="font-semibold">{story.title}</h3>
            <p className="text-xs text-gray-500 mb-2">
                by {story.author?.name}
            </p>
            <p className="text-sm text-gray-600">{story.content}</p>

            {id === story.authorId && (
                <button
                    onClick={() => onDelete(story.id)}
                    className="text-red-600 text-sm mt-2"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

const AlumniNetwork = () => {

    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stories, setStories] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const handleAddStory = async () => {
        try {
            await API.post("/stories", { title, content });
            setShowModal(false);
            setTitle("");
            setContent("");

            // reload stories
            const res = await API.get("/stories");
            setStories(res.data);

        } catch (err) {
            console.error("Error adding story:", err);
        }
    };

    const handleDeleteStory = async (id) => {
        try {
            await API.delete(`/stories/${id}`);

            setStories(stories.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Error deleting story:", err);
        }
    };

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await API.get("/stories");
                console.log(res.data);
                setStories(res.data);
            } catch (err) {
                console.error("Error fetching stories:", err);
            }
        };
        fetchStories();
    }, [])


    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const res = await API.get("/users/alumni");
                setAlumni(res.data);
            } catch (err) {
                console.error("Error fetching alumni:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();
    }, []);

    return (
        <>
            <div className='alumni-network grid grid-cols-[60%_40%] gap-6 mt-24 m-10'>
                <div className='alumni-container bg-purple-100 p-6 rounded'>
                    <h1 className="text-2xl font-bold">Alumni Network</h1>
                    <p className="mt-1 text-gray-600">Connect with fellow alumni.</p>

                    <input
                        type="text"
                        placeholder="Search alumni..."
                        className="mt-4 p-2 border rounded w-full max-w-md"
                    />

                    <div className='my-8'>
                        {loading ? (
                            <p>Loading alumni...</p>
                        ) : (
                            alumni.map((a) => (
                                <AlumniCard key={a.id} alumni={a} />
                            ))
                        )}
                    </div>
                </div>

                <div className="stories-container bg-purple-100 p-6 rounded mr-4">
                    <h2 className="text-2xl font-bold">Alumni Stories</h2>
                    <p className="mt-1 text-gray-600">Read inspiring stories from our alumni.</p>
                    <div className="my-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Add your Story
                        </button>

                        {stories.map((s) => (
                            <StoryCard key={s.id} story={s} onDelete={handleDeleteStory} />
                        ))}
                    </div>
                </div>
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white p-6 rounded w-[400px]">
                            <h2 className="text-xl font-bold mb-4">Write Your Story</h2>

                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                            />

                            <textarea
                                placeholder="Your story..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full border p-2 rounded mb-3 h-28"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAddStory}
                                    className="px-4 py-2 bg-purple-600 text-white rounded"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AlumniNetwork;
