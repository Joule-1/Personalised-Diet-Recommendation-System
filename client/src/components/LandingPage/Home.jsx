import React from "react";
import {
    Logo,
    HomeCalendarIcon1,
    HomeCalendarIcon2,
    ChecklistPenIcon,
    ChecklistNoteIcon,
    TaskIcon,
    CheckBoxIcon,
    CommentIcon,
    ThemeToggle_Dark,
    BrandIcon,
} from "../../assets";
import Testimonials from "./Testimonials.jsx";
import Pricings from "./Pricings";
import { Link } from "react-scroll";

const Home = () => {
    const currentYear = new Date().getFullYear();
    return (
        <section>
            <div>
                <div className="absolute hidden sm:top-20 sm:left-5 sm:block sm:w-40">
                    <img src={HomeCalendarIcon1} className="w-full" />
                </div>
                <div className="absolute hidden sm:right-10 sm:bottom-15 sm:block sm:w-35">
                    <img src={ChecklistPenIcon} className="w-full" />
                </div>
                <div className="absolute hidden sm:-bottom-8 sm:left-5 sm:block sm:w-30">
                    <img src={ChecklistNoteIcon} className="w-full" />
                </div>
            </div>
            <div className="flex items-center justify-center pt-20 sm:h-screen sm:pt-0">
                <div className="flex flex-col items-center">
                    <span className="w-22 rounded-2xl shadow-2xl">
                        <img
                            src={Logo}
                            className="mx-auto w-20 hover:scale-105"
                        />
                    </span>
                    <div className="poppins-bold my-6 text-2xl sm:text-5xl">
                        Nourish. Align.{" "}
                        <span className="text-[#0084cc]">Ascend.</span>
                    </div>
                    <div className="poppins-semibold px-5 text-center text-sm text-gray-500 sm:text-base">
                        It is a convergence where data, discipline, and desire
                        collapse into nourishment — rewriting the body’s logic
                        with every sovereign choice.
                    </div>
                    <button className="poppins-semibold my-6 cursor-pointer rounded-2xl border border-2 border-[#0084cc] bg-[#0084cc] p-2 px-5 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#0084cc]">
                        <a
                            href="/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {" "}
                            Get Started{" "}
                        </a>
                    </button>
                </div>
            </div>

            <Testimonials />

            <Pricings />

            <div className="mt-10 mb-5">
                <div className="poppins-semibold my-5 text-center text-lg sm:text-xl">
                    Join a community of millions of users globally who are using
                    PDRS to get more done.
                </div>
                <div className="flex justify-center">
                    <img src={BrandIcon} />
                </div>
            </div>

            <div className="bg-gray-100 pt-5 sm:px-10">
                <div>
                    <div className="flex items-center">
                        <div className={`w-10 hover:scale-105`}>
                            <img src={Logo} className="w-full" />
                        </div>
                        <span className="poppins-semibold ml-2 text-xl">
                            PDRS
                        </span>
                    </div>
                </div>
                <div className="poppins-medium my-5 px-2 text-center text-sm sm:text-xl">
                    Stay organized and boost your productivity
                </div>
                <div className="flex items-center justify-evenly">
                    <div className="relative w-20 rotate-20 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={TaskIcon} className="w-full" />
                    </div>
                    <div className="relative bottom-[-60px] w-20 -rotate-30 rounded-xl bg-gray-50 p-2 shadow-2xl">
                        <img src={CheckBoxIcon} />
                    </div>
                    <div className="relative w-20 rotate-35 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={HomeCalendarIcon2} />
                    </div>
                    <div className="relative bottom-[-30px] w-20 -rotate-15 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={CommentIcon} />
                    </div>
                    <div className="relative right-4 bottom-[15px] w-20 rotate-35 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={ThemeToggle_Dark} />
                    </div>
                </div>
                <hr className="mt-20 border-gray-300" />
                <div className="poppins-semibold flex flex-wrap justify-center py-5 text-sm text-gray-600 sm:justify-between">
                    <div className="my-auto">
                        © {currentYear}. All rights reserved.
                    </div>
                    <div className="my-5 flex flex-wrap justify-center">
                        <div className="mx-2 mb-4 cursor-pointer hover:text-[#0084cc]">
                            <a href="/privacy">Privacy Policy</a>
                        </div>
                        <div className="mx-2 mb-4 cursor-pointer hover:text-[#0084cc]">
                            <a href="/tos">Terms of Service</a>
                        </div>
                        <div className="mx-2 cursor-pointer hover:text-[#0084cc]">
                            <Link
                                to="pricings"
                                id="pricings"
                                offset={-40}
                                smooth={true}
                                duration={500}
                            >
                                Pricing
                            </Link>
                        </div>
                        <div className="mx-2 cursor-pointer hover:text-[#0084cc]">
                            <Link
                                to="testimonials"
                                id="testimonials"
                                offset={-60}
                                smooth={true}
                                duration={500}
                            >
                                Testimonials
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
