import React, { useContext, useEffect, useState } from 'react';
import TourCardGrid from '../Component/TourCard';

import UserAuthContext from '../Context/Context';
import useAxiosSecure from '../Customhook/useAxiosSecure';
import Loader from '../Component/Loader';







const Allpackage = () => {
 const axiosSecure = useAxiosSecure()
  
  const {user}=useContext(UserAuthContext)


  
    const [search,setSearch]=useState("")
    
     const [tours,setTours]=useState([])
     
   
    useEffect(()=>{
      
         
          axiosSecure.get("/alltourpackage",{
          params: search ? {
            location:search
           } :""
         }).then(res=>setTours(res.data)).catch(err=>console.log(err))
      
     
     
   
    
    }
      
    ,[search])
    const handler=(e)=>{
      e.preventDefault()
      setSearch(e.target.area.value);
      
    }
    return (
        <div className='p-4 max-w-7xl mx-auto'>
               <div>
            <form onSubmit={handler} >
              <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input name='area' type="search" required placeholder="Filter your  location" />
</label>
 <button type='submit' className="btn btn-neutral join-item">Search</button>
            </form>
        </div>
     <div className="">
      <h2 className="text-2xl font-bold my-10 text-center">Available Tours</h2>
  {tours.length >0 ? <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          { tours.length >0 ?  tours.map(tour=> <TourCardGrid key={tour._id} tour={tour}></TourCardGrid>):<h1>loading</h1>}
             </div> :<Loader></Loader>  }
        </div>
        </div>
    );
};

export default Allpackage;