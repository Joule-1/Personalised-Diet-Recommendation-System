import { useState, useEffect, useContext } from "react";
import React from "react";
import { Logo } from "../assets";
import { Link } from "react-scroll";
import { userLoginAPI } from "../utils/UserLoginAxios.js";
import { AuthContext } from "../utils/AuthContext.jsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);

    const currentUserName = user?.data?.name;
    const currentUserAvatar = user?.data?.avatarURL;

    const handleLogout = async () => {
        try {
            await userLoginAPI.get("/logout");
            setUser(null);
            location.pathname === "/";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <section className="z-50 flex h-15 w-full place-content-between items-center bg-white px-5 text-sm shadow-lg">
            <a className="flex items-center" href="/">
                <div className={`w-10 hover:scale-105`}>
                    <img src={Logo} className="w-full" />
                </div>
                <span
                    className="poppins-semibold ml-2 text-xl"
                    title="Personalised Diet Recommendation System"
                >
                    PDRS
                </span>
            </a>

            <div className="poppins-semibold absolute left-1/2 flex -translate-x-1/2 items-center md:block">
                <span
                    className={`mx-5 cursor-pointer hover:text-[#0084cc] ${location.pathname === "/privacy" ? "text-[#0084cc]" : ""}`}
                >
                    <a href="/privacy">Privacy</a>
                </span>
                <span
                    className={`mx-5 cursor-pointer hover:text-[#0084cc] ${location.pathname === "/tos" ? "text-[#0084cc]" : ""}`}
                >
                    <a href="/tos">Terms of Service</a>
                </span>
                {location.pathname === "/" ? (
                    <Link
                        to="pricings"
                        id="pricings"
                        offset={-40}
                        smooth={true}
                        duration={500}
                        className="mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10"
                    >
                        Pricing
                    </Link>
                ) : (
                    <a
                        className={`mx-5 cursor-pointer hover:text-[#0084cc] ${location.pathname === "/pricing" ? "text-[#0084cc]" : ""}`}
                        href="/pricing"
                    >
                        Pricing
                    </a>
                )}

                {location.pathname === "/" ? (
                    <Link
                        to="testimonials"
                        id="testimonials"
                        offset={-40}
                        smooth={true}
                        duration={500}
                        className="mx-5 cursor-pointer hover:text-[#0084cc]"
                    >
                        Testimonials
                    </Link>
                ) : (
                    <a
                        className={`${location.pathname === "/testimonials" ? "text-[#0084cc]" : ""} mx-5 cursor-pointer hover:text-[#0084cc]`}
                        href="/testimonials"
                    >
                        Testimonials
                    </a>
                )}
            </div>
            {!currentUserName &&
                !currentUserAvatar &&
                location.pathname === "/" && (
                    <div className="flex items-center">
                        <a
                            href="/signin"
                            id="NavbarHomeSign"
                            className="ml-5 cursor-pointer hover:text-[#0084cc] sm:ml-5"
                        >
                            <span>Sign In</span>
                        </a>
                        <a
                            href="/signup"
                            id="NavbarHomeSign"
                            className="poppins-semibold ml-2 cursor-pointer rounded-xl border border-2 bg-[#0084cc] p-2 text-white hover:border-[#0084cc] hover:bg-white hover:text-[#0084cc] sm:ml-5"
                        >
                            <span>Sign Up</span>
                        </a>
                    </div>
                )}

            {location.pathname === "/signin" && !user && (
                <a className="text-xs" href="/signup">
                    <span className="mr-2 text-gray-500">
                        Don't have an account?
                    </span>
                    <span className="poppins-semibold cursor-pointer rounded-xl border-2 bg-[#0084cc] p-2 text-white hover:border-[#0084cc] hover:bg-white hover:text-[#0084cc]">
                        Sign Up
                    </span>
                </a>
            )}
            {location.pathname === "/signup" && !user && (
                <a className="text-xs" href="/signin">
                    <span className="text-gray-500">
                        Already have an account?
                    </span>
                    <span className="poppins-semibold ml-2 cursor-pointer rounded-xl border-2 bg-[#0084cc] p-2 text-white hover:border-[#0084cc] hover:bg-white hover:text-[#0084cc]">
                        Sign In
                    </span>
                </a>
            )}
            {currentUserName && currentUserAvatar && (
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img
                            src={currentUserAvatar}
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="poppins-semibold ml-2">
                            {currentUserName}
                        </span>
                    </div>
                    <span
                        id="NavbarHomeSign"
                        className="poppins-semibold ml-2 cursor-pointer rounded-xl border border-2 bg-red-600 p-2 text-white hover:border-red-600 hover:bg-white hover:text-red-600 sm:ml-5"
                    >
                        <div onClick={handleLogout}>Sign Off</div>
                    </span>
                </div>
            )}
        </section>
    );
};

export default Navbar;
