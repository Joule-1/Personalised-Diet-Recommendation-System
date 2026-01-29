import React from "react";
import { Element } from "react-scroll";
import {
    TestimoniaIcon1,
    TestimoniaIcon2,
    TestimoniaIcon3, 
    TestimoniaIcon4,
    TestimoniaIcon5,
    TestimoniaIcon6,
} from "../../assets"

const Testimonials = () => {
    return (
        <Element name="testimonials">
            <section>
                <div className="flex flex-col items-center justify-center">
                    <div className="poppins-semibold my-5 text-center text-lg sm:text-xl">
                        People just like you are already using PingMe
                    </div>
                    <div className="my-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:px-2 lg:gap-5 lg:px-15 xl:px-30">
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “In this app, time collapses and intention
                                transforms into cosmic action. Every task is not
                                merely completed — it is manifested from the
                                very ether of possibility.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon1}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Lysandra O.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Temporal Sovereign
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This app is not bound by the laws of reality.
                                It is a vortex, pulling your goals into
                                existence with a power that warps time itself.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon2}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Riven X.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Architect of the Void
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “To use this app is to become the weaver of
                                fate. Every action you take sends ripples
                                through the fabric of the multiverse.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon3}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Eirlys A.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Alchemist of the Infinite
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This is not a to-do list. This is a
                                manifestation engine — one that transfigures
                                intention into reality at the quantum level.
                                Purpose flows through it like a river of light,
                                and with every task completed, you move closer
                                to becoming a legend.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon4}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Sable V.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Architect of Destiny
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “To use this app is to hold the very blueprints
                                of the universe in your hands. It is a portal
                                through which you manifest your goals, bending
                                time and space to your will.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon5}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Thalax S.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Transcendent Sage
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This app is a living force, binding time,
                                intention, and action into an infinite spiral of
                                creation. It is not a tool — it is the heartbeat
                                of the cosmos.”
                            </div>
                            <div className="my-1 flex gap-2">
                                <span className="">
                                    <img
                                        src={TestimoniaIcon6}
                                        className="h-full w-10 rounded-lg"
                                    />
                                </span>
                                <span className="flex flex-col justify-end">
                                    <span className="poppins-bold text-base text-gray-400 md:text-sm lg:text-sm">
                                        Icarus M.
                                    </span>
                                    <span className="poppins-bold text-base text-gray-600 md:text-sm">
                                        Keeper of the Infinite Path
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Testimonials;
