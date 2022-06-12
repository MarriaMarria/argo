import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h1 className="h1">Become an argonaut</h1>
            </div>
            <div className="navLinks">
                <Link to='/login' className='login'>Log in</Link>
                <Link to='/register' className='register'>Register</Link>
            </div>
        </div>

    )
}

export default Navbar;