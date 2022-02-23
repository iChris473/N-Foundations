

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INTITIAL_STATE = {
    isFetching: false,
    error: false,
    getPost: false
};
if(typeof window !== 'undefined') INTITIAL_STATE.user = JSON.parse(localStorage.getItem('user'))  || null

export  const AuthContext = createContext(INTITIAL_STATE);

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, INTITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])
    
    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}