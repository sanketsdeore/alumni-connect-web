import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Logo from "../assets/react.svg";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        // Simple validation
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("id", res.data.user.id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            const role = res.data.user.role;

            // Role-based redirects
            if (role === "admin") {
                window.location.replace("/admin/dashboard");
            } else {
                window.location.replace("/home");
            }

        } catch (err) {
            console.error(err);

            // Backend-friendly error display
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
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
                        Welcome Back
                    </h3>

                    <p className="mt-1 text-center text-gray-600">
                        Login to continue
                    </p>

                    {/* ERROR */}
                    {error && (
                        <div className="mt-3 text-center text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-6">

                        <div className="w-full">
                            <input
                                type="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                                    w-full mt-2 px-4 py-3 
                                    bg-white border border-outline rounded-xl 
                                    text-onSurface placeholder-gray-500
                                    focus:border-primary focus:ring-2 focus:ring-primary/40 
                                    outline-none transition
                                "
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                                    w-full mt-2 px-4 py-3 
                                    bg-white border border-outline rounded-xl 
                                    text-onSurface placeholder-gray-500
                                    focus:border-primary focus:ring-2 focus:ring-primary/40 
                                    outline-none transition
                                "
                            />
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <a
                                href="#"
                                className="text-sm text-secondary hover:underline"
                            >
                                Forgot Password?
                            </a>

                            <button
                                type="submit"
                                className="
                                    px-6 py-2.5 
                                    text-sm font-medium 
                                    text-white bg-primary rounded-xl 
                                    hover:bg-primary/80 
                                    transition-colors
                                "
                            >
                                Login
                            </button>
                        </div>

                    </form>
                </div>

                <div className="py-4 bg-surfaceLow text-center">
                    <span className="text-sm text-onSurface">
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        className="mx-1 text-sm font-bold text-primary hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;
