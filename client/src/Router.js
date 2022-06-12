import Main from "./components/Main/Main";
import Navbar from "./components/navbar/Navbar";
import React from "react";
import {
    BrowserRouter, 
    Route, 
    Routes 
} from "react-router-dom";

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Main />
            {/* links to go to other pages */}
            <Routes>
                {/* <Route path="/" element="{<Home />}"/> */}
                <Route path="/login">Login</Route>
                {/* whenever my domaine name is /login, render what is in this route */}
                <Route path="/register">Register</Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
