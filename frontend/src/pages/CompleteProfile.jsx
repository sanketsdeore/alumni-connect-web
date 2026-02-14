import { useState } from "react";
import API from "../services/api";

function CompleteProfile() {
    const [form, setForm] = useState({
        passingYear: "",
        company: "",
        experience: "",
        location: "",
        linkedin: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!form.passingYear || !form.company || !form.experience || !form.location) {
            setError("Please fill all required fields.");
            setLoading(false);
            return;
        }

        try {
            await API.post("/alumni/profile", {
                passingYear: parseInt(form.passingYear),
                company: form.company,
                experience: parseInt(form.experience),
                location: form.location,
                linkedin: form.linkedin,
            });
            
            window.location.replace("/home");


        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to save profile. Try again.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-md bg-surface border border-outline">

                <div className="px-6 py-6">

                    <h3 className="text-xl font-semibold text-center text-onSurface">
                        Complete Your Alumni Profile
                    </h3>

                    <p className="mt-1 text-center text-gray-600 text-sm">
                        Tell us a bit about your professional journey
                    </p>
                    
                    {error && (
                        <div className="mt-3 text-center text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">

                        <input
                            type="number"
                            name="passingYear"
                            placeholder="Passing Year"
                            value={form.passingYear}
                            onChange={handleChange}
                            className="
                                w-full mt-2 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={form.company}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <input
                            type="number"
                            name="experience"
                            placeholder="Years of Experience"
                            value={form.experience}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Current Location"
                            value={form.location}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn URL (optional)"
                            value={form.linkedin}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                mt-5 w-full py-3 
                                text-sm font-medium 
                                text-white bg-primary rounded-xl 
                                hover:bg-primary/80 transition
                                ${loading ? "opacity-70 cursor-not-allowed" : ""}
                            `}
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default CompleteProfile;
