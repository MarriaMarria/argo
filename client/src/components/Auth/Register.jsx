import Axios from 'axios';
import UserContext from './../../context/UserContext';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Auth.scss";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getUser } = useContext(UserContext);

    // useNavigate hook to redirect to another page after logging in
    const navigate = useNavigate();
    // function to register new account 
    async function register(e) {
        e.preventDefault(); // prevent the page from reloading when we click on register button

        const registerData = { // body of the request -> save our incoming data
            email,
            password,
            passwordVerify
        }

        await Axios.post("http://localhost:5555/auth/", registerData); // post to DB
        // console.log("this is a cookie", document.cookie);*
        await getUser();
        navigate("/");
    }


    return <div className="auth-form">
        <h2>Create a new account</h2>
        <form className="form" onSubmit={register}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="passwordVerify">Verify password</label>
            <input id="passwordVerify" type="password" value={passwordVerify} placeholder="Verify password" onChange={(e) => setPasswordVerify(e.target.value)} />
            <button className='btn-submit' type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login instead</Link></p>
    </div>;
};

export default Register;