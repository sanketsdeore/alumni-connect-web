import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ProfilePage = () => {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passingYear: "",
        company: "",
        experience: "",
        location: "",
        linkedin: ""
    });

    useEffect(() => {

        let ignore = false;

        async function fetchData() {
            try {
                const res = await API.get("/profile");
                const user = res.data;

                if (!ignore) {
                    setForm({
                        name: user.name || "",
                        email: user.email || "",
                        password: "",
                        passingYear: user.alumniProfile?.passingYear || "",
                        company: user.alumniProfile?.company || "",
                        experience: user.alumniProfile?.experience || "",
                        location: user.alumniProfile?.location || "",
                        linkedin: user.alumniProfile?.linkedin || ""
                    });
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

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleUpdate = async () => {
        try {
            await API.put("/profile", form);

            alert("Profile updated successfully");

            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/home", { replace: true });
            }

        } catch (err) {
            console.error(err);
        }
    };

    const handleBack = () => {
        if (role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        } else {
            navigate("/home", { replace: true });
        }
    };

    return (
        <>
            <div className="mt-4 mx-10">
                <button
                    onClick={handleBack}
                    className="text-purple-700 font-medium hover:underline"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="job-board h-[80vh] mt-4 m-10 p-6 bg-purple-100 rounded overflow-y-auto scrollbar-thin">

                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="mt-1 text-gray-600">
                    Keep your information up to date.
                </p>

                <div className="bg-white p-6 rounded shadow mt-6 space-y-6">

                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Basic Information
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    New Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                        </div>
                    </div>

                    {role === "alumni" && (
                        <div>
                            <hr className="my-4" />

                            <h2 className="text-lg font-semibold mb-4">
                                Alumni Details
                            </h2>

                            <div className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Passing Year
                                    </label>
                                    <input
                                        name="passingYear"
                                        value={form.passingYear}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Company
                                    </label>
                                    <input
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Experience (Years)
                                    </label>
                                    <input
                                        name="experience"
                                        value={form.experience}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Location
                                    </label>
                                    <input
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        name="linkedin"
                                        value={form.linkedin}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            onClick={handleUpdate}
                            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
                        >
                            Update Profile
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProfilePage;
