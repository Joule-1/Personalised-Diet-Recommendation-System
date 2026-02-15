import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, replace } from "react-router-dom";
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
import { AuthContext } from "./utils/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const AppWrapper = () => {
    const {user, setUser} = useContext(AuthContext)
    return (
        <>
            <Navbar />
            <DynamicTitle />
            <Routes>
                <Route path="/" element={
                    user ? (<Navigate to = "/dashboard" replace />) : (<Home />)
                } />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/pricing" element={<Pricings />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/tos" element={<TermsOfService />} />
                <Route
                    path="/dashboard"
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
