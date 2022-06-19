import Axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserContextProvider(props) {
    const [user, setUser] = useState(undefined);

    async function getUser() {
        const userRes = await Axios.get("http://localhost:5555/auth/loggedIn");
        setUser(userRes.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return <UserContext.Provider value={{user, getUser}}> 
    {/* children come from App.js, everyhting inside <UserContextProvider> */}
        {props.children} 
    </UserContext.Provider>; // this value (user) will be exposed to all the UserContext child components
}

export default UserContext;
export {UserContextProvider};