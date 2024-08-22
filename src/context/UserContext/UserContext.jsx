import React, { useState } from 'react'

const UserContext = React.createContext();

export default UserContext;

const UserContextProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    return(
        <UserContext.Provider value={{user,setUser}} >
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider};
