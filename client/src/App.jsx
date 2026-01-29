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

const AppWrapper = () => {
    return ( 
        <>
            <DynamicTitle />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/tos" element={<TermsOfService />} />
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
