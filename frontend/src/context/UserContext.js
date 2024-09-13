import React, { useContext } from "react";

const UserContext = React.createContext({
    cart: 0,
    sidd: "abhay",
    setCartCount: () => {
        cart++;
    },
     changeName(input){
    console.log("i am called")
}

});

export const Context = UserContext.Provider;
export default function sidd1() {

    return useContext(UserContext)
}