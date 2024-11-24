import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../FireBase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

//custom hook useContext
export const useAuth = () => {
    return useContext(AuthContext)
}

//context provider
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //handle sign out
    const signout = async () => {
        return await signOut(auth)
    }

    //handle auth state change, get data user
    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
            if(user) {
                const name = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
                const uid = user.uid;
            }
        })
        return unsubscribe //unmount to cancel listener 
    }, [])

    //***************login, signup by email and password start***************//
    //handle signup user
    const signup = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    //handle signin user
    const signin = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    //***************login, signup by email and password end***************//

    //***************login, signup by google start***************//
    const signinWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        setCurrentUser(result.user)
        return result 
    }
    
    //***************login, signup by google end***************//

    const value = {
        currentUser,
        signup,
        signin,
        signinWithGoogle,
        signout,
        loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



