import React, { useEffect, useState } from 'react';

import UserAuthContext from './Context';
import auth from '../FireBase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const AuthContextProvider = ({children}) => {
    const [theme,setTheme]=useState("light")

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme)
        

    },[theme])

const toggleTheme=()=>{
            setTheme(prev=>prev ==="light"? "dark":"light")
        }
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
   useEffect(()=>{
const unSubScribe = onAuthStateChanged(auth, (user) => {
  if (user) {
        
   setUser(user)
 
  
  } else {
   
    setUser(null)
    
  
  }
    setLoading(false)
  
});
 return ()=>unSubScribe()

   },[])

const createNewUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
} 
const updateUserProfile=(name,photoURL)=>{
    return  updateProfile(auth.currentUser, {
  displayName: name, photoURL: photoURL
})
}
const userLogin=(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}
const userLogOut=()=>{
    return signOut(auth)
}
const loginWithGoogle=()=>{
    return signInWithPopup(auth, provider)
}
    const data={
        user,
        setUser,
        createNewUser,
        updateUserProfile,
        userLogin,
        loginWithGoogle, 
        userLogOut,
        loading,
        setLoading,
        toggleTheme,
        theme
        
       
       
    }   
    return (
        <UserAuthContext.Provider value={data} >
            {children}
        </UserAuthContext.Provider>
    );
};

export default AuthContextProvider;