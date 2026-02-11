import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    CalendarCheck,
    MessageCircle,
    Settings,
    LogOut,
    Menu,
    X,
    BringToFront,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import api from "../../utils/UserAxios";

const UserNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res2 = await api.get("/current-user");
                setUserInfo(res2.data.data);
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogOut = async () => {
        await api.get("/logout");
        navigate("/");
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="bg-opacity-50 fixed inset-0 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-40 flex h-screen w-64 flex-col justify-between bg-white px-4 py-6 shadow-md transition-transform duration-300 md:static md:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    <div className="mb-8 flex items-center gap-2">
                        <img src={Logo} className="w-8" />
                        <span className="text-xl font-semibold text-gray-800">
                            PingMe
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 text-gray-700">
                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600 ${location.pathname === "/dashboard" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            to="/tasks"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600 ${location.pathname === "/tasks" ? "bg-blue-100 text-blue-500" : "bg-white text-gray-500"}`}
                        >
                            <BringToFront className="h-5 w-5" />
                            Task
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-t px-3 pt-4 text-gray-600">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-300">
                        <img
                            src={userInfo?.avatar}
                            className="h-full w-full object-cover"
                            alt="avatar"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {userInfo?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {userInfo?.email}
                        </span>
                    </div>
                    <button
                        className="ml-auto text-red-500 hover:text-red-600"
                        onClick={handleLogOut}
                    >
                        <LogOut className="h-5 w-5 cursor-pointer" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserNavbar;
