import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav className="navbar fixed top-0 left-0 right-0 flex items-center justify-between px-8 p-2 bg-purple-800 text-white">
            <div className="flex logo items-center">
                <img className='rounded-full' width={48} src="logo.png" alt="" />
                <span className="ml-2 font-bold text-lg">Alumni Connect</span>
            </div>
            <ul className="nav-links flex space-x-6 items-center">
                <li className="font-semibold hover:text-purple-200 transition"><a href="/home">Home</a></li>
                <li className="font-semibold hover:text-purple-200 transition"><a href="/network">Alumni Network</a></li>
                <li className="font-semibold hover:text-purple-200 transition"><a href="/jobs">Job Board</a></li>
                <li className="font-semibold hover:text-purple-200 transition"><a href="/projects">Donate</a></li>
                <li className="font-semibold hover:text-purple-200 transition"><a href="/events">Events</a></li>
                <li>
                    <button onClick={() => setOpen(!open)}>
                        <img width={44} src="user.png" alt="" />
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 w-44 text-black bg-purple-100 shadow rounded">
                            <ul className="text-sm">
                                <li className="px-4 py-3 hover:bg-purple-200 cursor-pointer">Profile</li>
                                <li
                                    onClick={handleLogout}
                                    className="px-4 py-3 hover:bg-purple-200 cursor-pointer"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
