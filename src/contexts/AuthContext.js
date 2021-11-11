import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){
    
    const [currentUser, setCurrenUser] = useState();
    const [loading, setLoading] = useState(true);

    
    const value = {
        currentUser,
        signup,
        login
    }


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrenUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    return (

        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}