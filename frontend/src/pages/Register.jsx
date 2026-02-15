import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Logo from "../assets/react.svg";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.email || !form.password || !form.role) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await API.post("/auth/register", form);

            localStorage.setItem("id", res.data.user.id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            const user = res.data.user;

            if (user.role === "alumni") {
                window.location.replace("/complete-profile");
            } else if (user.role === "admin") {
                window.location.replace("/admin/dashboard");
            } else {
                window.location.replace("/home");
            }

        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-md bg-surface border border-outline">

                <div className="px-6 py-6">

                    <div className="flex justify-center">
                        <img src={Logo} className="h-14 w-14" alt="logo" />
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-center text-onSurface">
                        Create Your Account
                    </h3>

                    {error && (
                        <div className="mt-3 text-center text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="mt-6">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
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
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={form.email}
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface placeholder-gray-500
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        />

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="
                                w-full mt-4 px-4 py-3 
                                bg-white border border-outline rounded-xl 
                                text-onSurface
                                focus:border-primary focus:ring-2 focus:ring-primary/40 
                                outline-none transition
                            "
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button
                            type="submit"
                            className="
                                mt-5 w-full py-3 
                                text-sm font-medium 
                                text-white bg-primary rounded-xl 
                                hover:bg-primary/80 transition
                            "
                        >
                            Register
                        </button>
                    </form>
                </div>

                <div className="py-4 bg-surfaceLow text-center">
                    <span className="text-sm text-onSurface">
                        Already have an account?
                    </span>

                    <Link
                        to="/"
                        className="mx-1 text-sm font-bold text-primary hover:underline"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Register;
