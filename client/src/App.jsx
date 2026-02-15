import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Privacy from "./components/LandingPage/Privacy.jsx";
import TermsOfService from "./components/LandingPage/TermsOfService.jsx";
import NotFound from "./components/NotFound.jsx";
import DynamicTitle from "./utils/DynamicTitle.jsx";
import UserPreferencesCollector from "./components/UserPreferencesCollector.jsx";
import Navbar from "./components/Navbar.jsx";
import Pricings from "./components/LandingPage/Pricings.jsx";
import Testimonials from "./components/LandingPage/Testimonials.jsx";
import { checkActiveUser } from "./utils/IsLogin.js";

const AppWrapper = () => {
    return (
        <>
            <Navbar />
            <DynamicTitle />
            <Routes>
                <Route path="/" element={(checkActiveUser() ? <UserPreferencesCollector /> : <Home />)} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/pricing" element={<Pricings />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/tos" element={<TermsOfService />} />
                <Route
                    path="/userPreferencesCollector"
                    element={<UserPreferencesCollector />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppWrapper />
        </BrowserRouter>
    );
}

export default App;
