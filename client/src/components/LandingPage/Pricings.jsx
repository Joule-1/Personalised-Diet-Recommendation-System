import React from "react";
import { Element } from "react-scroll";

const Pricings = () => {
    return (
        <Element name="pricings">
            <section>
                <div className="mb-20 flex flex-col items-center justify-center">
                    <div className="poppins-semibold mt-10 mb-5 text-base text-lg sm:text-xl">
                        Unlock Your Experience
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-8">
                        <div className="flex flex-col rounded-xl border border-gray-400 bg-gray-50 p-5 px-8 transition-all duration-500 hover:scale-101">
                            <span className="poppins-semibold my-1 text-xl">
                                Basic Plan
                            </span>
                            <span className="poppins-medium text-xs text-gray-400">
                                Perfect for getting started
                            </span>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-semibold">
                                <span className="text-4xl">$0</span>
                                <span className="poppins-medium text-2xl text-gray-500">
                                    /mo
                                </span>
                            </span>
                            <button className="poppins-semibold my-5 cursor-pointer rounded-lg border border-2 border-[#0084cc] bg-[#0084cc] p-1 px-15 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#0084cc]">
                                <a
                                    href="/signup"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    Get Started{" "}
                                </a>
                            </button>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-medium flex flex-col text-sm">
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Personal Nutrition
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Smart Meals
                                </span>
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Calorie Awareness
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Healthy Guidance
                                </span>
                                <span>✔ &nbsp;&nbsp;&nbsp;Daily Balance</span>
                            </span>
                        </div>
                        <div className="flex scale-110 flex-col rounded-xl border border-[#0084cc] bg-[#0084cc] p-5 px-5 shadow-xl transition-all duration-500 hover:scale-111 md:px-8">
                            <span className="poppins-semibold my-1 text-xl text-white">
                                Pro Plan
                            </span>
                            <span className="poppins-medium text-xs text-gray-300">
                                Personalised Health
                            </span>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-semibold">
                                <span className="text-4xl text-white">$0</span>
                                <span className="poppins-medium text-2xl text-gray-300">
                                    /mo
                                </span>
                            </span>
                            <span className="poppins-medium my-2 text-xs text-gray-300">
                                Best Choice
                            </span>
                            <button className="poppins-semibold my-3 cursor-pointer rounded-lg border border-2 border-[#0084cc] bg-white p-1 px-15 text-base text-[#0084cc] shadow-xl transition-all duration-300 hover:border-white hover:bg-[#0084cc] hover:text-white">
                                <a
                                    href="/signup"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    Get Started{" "}
                                </a>
                            </button>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-medium flex flex-col text-sm text-white">
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Adaptive Nutrition
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Condition Aware
                                </span>
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Macro Intelligence
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Meal Precision
                                </span>
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Health Alignment
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col rounded-xl border border-gray-400 bg-gray-50 p-5 px-8 transition-all duration-500 hover:scale-101">
                            <span className="poppins-semibold my-1 text-xl">
                                Advanced Plan
                            </span>
                            <span className="poppins-medium text-xs text-gray-400">
                                For detailed insights & tracking
                            </span>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-semibold">
                                <span className="text-4xl">$0</span>
                                <span className="poppins-medium text-2xl text-gray-500">
                                    /mo
                                </span>
                            </span>
                            <button className="poppins-semibold my-5 cursor-pointer rounded-lg border border-2 border-[#0084cc] bg-[#0084cc] p-1 px-15 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#0084cc]">
                                <a
                                    href="/signup"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    Get Started{" "}
                                </a>
                            </button>
                            <hr className="my-5 border-gray-300" />
                            <span className="poppins-medium flex flex-col text-sm">
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Holistic Nutrition
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Multi-Condition
                                </span>
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Nutrient Intelligence
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Diet Mastery
                                </span>
                                <span>
                                    ✔ &nbsp;&nbsp;&nbsp;Wellness Optimization
                                </span>
                                <span className="my-2">
                                    ✔ &nbsp;&nbsp;&nbsp;Unlimited projects
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Pricings;
