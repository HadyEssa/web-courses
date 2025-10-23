import {auth} from "../config/firebaseConfig";
import  { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentuser, setCurrentuser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentuser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentuser,
        loading
    }

    return(
        <AuthContext.Provider value={value}>

            {!loading && children}
        </AuthContext.Provider>
    )

}







