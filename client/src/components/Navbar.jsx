import { useState, useEffect } from "react";
import React from "react";
import { Logo } from "../assets";
import { Link } from "react-scroll";
import { userLoginAPI } from "../utils/UserLoginAxios.js";

const Navbar = () => {
    const [currentUserName, setCurrentUserName] = useState(false);
    const [currentUserAvatar, setCurrentUserAvatar] = useState(false);
    console.log("HI",window.location.href)
    const checkCurrentUser = async () => {
        const checkActiveUser = await userLoginAPI
            .get("/current-user")
            .then((res) => {
                console.log("Current user:", res.data.data);
                if (res.data.data) {
                    setCurrentUserName(res.data.data.name);
                    setCurrentUserAvatar(res.data.data.avatarURL);
                }
            })
    };

    const handleLogout = async () => {
        try {
            await userLoginAPI.get("/logout");
            setCurrentUserName(false);
            setCurrentUserAvatar(false);
            window.location.href = "/home";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        checkCurrentUser();
    });

    return (
        <section className="z-50 flex h-15 w-full place-content-between items-center bg-white px-5 text-sm shadow-lg md:place-content-evenly">
            <a className="flex items-center" href="/home">
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
            {!currentUserName && !currentUserAvatar && (
                <div className="poppins-semibold flex items-center md:block">
                    <span className={`mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10 ${window.location.href.includes("/privacy") ? "text-[#0084cc]" : ""}`}>
                        <a href="/privacy">Privacy</a>
                    </span>
                    <span className={`mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10 ${window.location.href.includes("/tos") ? "text-[#0084cc]" : ""}`}>
                        <a href="/tos">Terms of Service</a>
                    </span>
                    {(window.location.href.includes("/home")) ? (
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
                    ) : <a className={`mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10 ${window.location.href.includes("/pricing") ? "text-[#0084cc]" : ""}`} href="/pricing">Pricing</a>}
                    
                         {window.location.href.includes("/home") ? (
                        <Link
                        to="testimonials"
                        id="testimonials"
                        offset={-40}
                        smooth={true}
                        duration={500}
                        className="mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10"
                    >
                        Testimonials
                    </Link>
                    ) : <a className={`mx-5 cursor-pointer hover:text-[#0084cc] sm:ml-10 ${window.location.href.includes("/testimonials") ? "text-[#0084cc]" : ""}`} href="/testimonials">Testimonials</a>}
                 </div>
            )}
            {!currentUserName && !currentUserAvatar && (
                <div className="flex items-center">
                    <span
                        id="NavbarHomeSign"
                        className="ml-5 cursor-pointer hover:text-[#0084cc] sm:ml-5"
                    >
                        <a href="/signin">Sign In</a>
                    </span>
                    <span
                        id="NavbarHomeSign"
                        className="poppins-semibold ml-2 cursor-pointer rounded-xl border border-2 bg-[#0084cc] p-2 text-white hover:border-[#0084cc] hover:bg-white hover:text-[#0084cc] sm:ml-5"
                    >
                        <a href="/signup">Sign Up</a>
                    </span>
                </div>
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
                        <div onClick={handleLogout}>LogOut</div>
                    </span>
                </div>
            )}
        </section>
    );
};

export default Navbar;
