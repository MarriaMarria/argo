import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

function Navbar() {
    return (
        <div className="navbar">
            <Link to='/'><h1>Become an argonaut</h1></Link>
            <Link to='/login'>Log in</Link>
            <Link to='/register'>Register</Link>
        </div>

    )
}

export default Navbar;