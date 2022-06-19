import Main from "./components/Main/Main";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import {
    BrowserRouter, 
    Route, 
    Routes 
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Main />
            {/* links to go to other pages */}
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
