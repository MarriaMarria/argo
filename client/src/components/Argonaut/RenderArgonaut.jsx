import React from 'react';
import Axios from "axios";
import "./RenderArgonaut.scss";

function RenderArgonaut({ argonaut, getArgonauts }) {

    async function deleteArgonaut() {
        await Axios.delete(`http://localhost:5555/argonaut/${argonaut._id}`);
        getArgonauts(); // refresh all argonauts on the page
    }


    return <div className="argonaut">
        {argonaut.name && <h2 className="name">{argonaut.name}</h2>}
        {/* if title exists we will create H2 */}
        {argonaut.email && <p className="email">{argonaut.email}</p>}
        {argonaut.info && <p className="info">{argonaut.info}</p>}
        <button className="btn-delete" onClick={deleteArgonaut}>Delete</button>
    </div>
}

export default RenderArgonaut;