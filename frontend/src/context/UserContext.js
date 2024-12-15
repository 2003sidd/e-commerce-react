import React, { useContext } from "react";

const UserContext = React.createContext({
        userDetails:{
            name:"redmi jii",
            age:21
          },
        setUserDetails: () => {},
    })

export const UserContextProvider = UserContext.Provider;

export default function useUserContext() {
    return useContext(UserContext)
}