import React, { useState } from 'react';
import Axios from "axios";
import "./Argonaut.scss";

function Argonaut({ getArgonauts, setArgonautFormOpen }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [info, setInfo] = useState("");


    async function saveArgonaut(e) {
        e.preventDefault();

        const argonautData = {
            name: name,
            email: email,
            info: info ? info : undefined,
        }

        await Axios.post("http://localhost:5555/argonaut/", argonautData);
        getArgonauts();
        closeForm();
    }

    function closeForm() {
        setArgonautFormOpen(false);
        setName("");
        setEmail("");
        setInfo("");
    }

    return <div className="argonaut">
        <form onSubmit={saveArgonaut}>
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="info">Info</label>
            <textarea id="info" value={info} onChange={(e) => setInfo(e.target.value)}/>

            <button type="submit" className="btn-register">Register</button>
            <button type="submit" className="btn-cancel" onClick={closeForm}>Cancel</button>

        </form>
    </div>
}

export default Argonaut;