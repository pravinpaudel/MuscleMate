import React, { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return null
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        // Need to parse into JSON obj cause it is stored as a string in localStorage
        const user = JSON.parse(localStorage.getItem('user'))
        if(user)
            dispatch({type: "LOGIN", payload: user})
    }, [])

    console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}