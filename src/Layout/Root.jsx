import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import Loader from '../Component/Loader';


const Root = () => {
    const navigation=useNavigation()
    return (
        <div className='dark:bg-gray-700'>
             <Navbar></Navbar>
             {
                navigation.state=='loading' ?<Loader></Loader>: <div className='max-w-7xl py-6 mx-auto'>
                 <Outlet></Outlet>
             </div>
             }
            
             <Footer></Footer>
        </div>
    );
};

export default Root;