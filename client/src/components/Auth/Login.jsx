import Axios from 'axios';
import UserContext from './../../context/UserContext';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Auth.scss";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getUser } = useContext(UserContext);

    // useNavigate hook to redirect to another page after logging in
    const navigate = useNavigate();

    // function to register new account 
    async function login(e) {
        e.preventDefault(); // prevent the page from reloading when we click on login button

        const loginData = { // body of the request -> save our incoming data
            email,
            password
        }

        await Axios.post("http://localhost:5555/auth/login", loginData); // post to DB
        // console.log("this is a cookie", document.cookie);

        await getUser();
        navigate("/");
    }


    return <div className="auth-form">
    <h2>Log in</h2>
    <form className="form" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className='btn-submit' type="submit">Login</button>
    </form>
    <p>Don't have an account yet? <Link to="/register">Register instead</Link></p>
    </div>;
};

export default Login;


