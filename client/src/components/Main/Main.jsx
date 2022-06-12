import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Argonaut from "../Argonaut/Argonaut";
import RenderArgonaut from "../Argonaut/RenderArgonaut";
import "./Main.scss";

function Main() {
    const [argonauts, setArgonauts] = useState([]);
    const [argonautFormOpen, setArgonautFormOpen] = useState(false);


    useEffect(() => {
        getArgonauts();
    }, []); // wh

    async function getArgonauts() {
        try {
            const argonauts = await Axios.get("http://localhost:5555/argonaut/");
            // console.log(snippets.data);
            setArgonauts(argonauts.data); // check devtools -> components -> home -> state, we have arrays with data of our argonaut
        } catch (err) {
            console.log(err);
        }
    }

    function renderArgonauts() {
        return argonauts.map((argonaut, i) => {
            return <RenderArgonaut key={i} argonaut={argonaut} getArgonauts={getArgonauts} />
        })
    }

    return <div className="main">
        {!argonautFormOpen && <button className="btn-form-toggle" onClick={() => setArgonautFormOpen(true)}>Add argonaut</button>}
        {argonautFormOpen && (
            <Argonaut setArgonautFormOpen={setArgonautFormOpen} getArgonauts={getArgonauts} />
        )}
        {renderArgonauts()}
    </div>

}

export default Main;