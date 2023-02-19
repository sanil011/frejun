import React, { useState, useEffect,useContext } from 'react'

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const store = {
        email,
        setEmail,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AuthContext);
};