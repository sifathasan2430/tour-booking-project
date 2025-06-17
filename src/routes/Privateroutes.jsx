import React, { use, useContext } from 'react';
import UserAuthContext from '../Context/Context';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Component/Loader';

const Privateroutes = ({children}) => {
   
    const location=useLocation()
    
   
   
    const {user,loading}=useContext(UserAuthContext)
    if (loading){
        return  <Loader></Loader>
    }
    if (!user){
        return <Navigate to={'/login'} state={location.pathname} ></Navigate>
    }
    return children
    
};

export default Privateroutes;