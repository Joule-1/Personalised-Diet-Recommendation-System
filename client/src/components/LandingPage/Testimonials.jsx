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
                        People just like you are already using PDRS
                    </div>
                    <div className="my-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:px-2 lg:gap-5 lg:px-15 xl:px-30">
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “In this app, nourishment collapses into intention, and intention transforms into vitality. Every meal is not merely consumed — it is summoned from the deepest ether of biological destiny”
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
                                        Metabolic Sovereign
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This app is not bound by the laws of ordinary nutrition. It is a vortex, drawing balance and sustenance into being with a force that bends hunger itself.”
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
                                        Architect of the Body
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “To use this app is to become the weaver of one’s own health. Every choice you make sends ripples through muscle, mind, and the hidden fabric of metabolism.”
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
                                        Alchemist of Vitality
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This app is a living force, binding biology, intention, and sustenance into an infinite spiral of renewal. It is not a tool — it is the quiet pulse behind enduring health.”
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
                                        Keeper of the Nutrient Path
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-15">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “This is not a diet plan. This is a manifestation engine — transmuting data into nourishment at a cellular level. With every recommendation followed, you ascend closer to bodily equilibrium.”
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
                                        Architect of Balance
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl md:row-span-8">
                            <div className="poppins-medium text-sm leading-7 sm:leading-7 md:leading-6 lg:leading-7">
                                “To engage with this system is to hold the blueprints of nourishment itself. Here, food obeys purpose, and the body answers in kind.”
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
                                        Transcendent Nourisher
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
