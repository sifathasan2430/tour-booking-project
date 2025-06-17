import React, { useContext, useEffect, useState } from 'react';
import UserAuthContext from '../Context/Context';

import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../Customhook/useAxiosSecure';

const UpdatePackage = () => {
  const axiosSecure=useAxiosSecure()
  
         const {user}=useContext(UserAuthContext)
         const guidePackage=useLoaderData()
        
           
    
const formHandler=(e)=>{
    e.preventDefault()
    const form=e.target
    const formdata=new FormData(form)
    const inputsData=Object.fromEntries(formdata.entries())
    inputsData.bookingCount=0;
    inputsData.created_at=new Date().toLocaleString()
    
    
    axiosSecure.put(`/package/${guidePackage._id}`,inputsData).then(res=>{

      if(res.data.modifiedCount){
      Swal.fire({
  title: "Data Update successfully",
  icon: "success",
  draggable: true
}); }
     
    }).catch(err=>console.log(err))
}
    return (
        <div className="w-full">
      {/* Slider */}
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden mb-6">
        <img
          src="https://source.unsplash.com/1600x600/?travel,nature"
          alt="slider"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-lg rounded-xl mb-10">
        <h2 className="text-2xl font-semibold  text-black text-center mb-6">Update Tour Package</h2>

        <form onSubmit={formHandler}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
           <input name="tourName"  defaultValue={guidePackage.tourName} placeholder="Tour Name"  className="input" />
          <input name="image" defaultValue={guidePackage.image} placeholder="Image URL"  className="input" />
          <input name="duration" defaultValue={guidePackage.duration} placeholder="Duration (e.g. 3 Days 2 Nights)"  className="input" />
          <input name="departureLocation" defaultValue={guidePackage.departureLocation} placeholder="Departure Location"  className="input" />
          <input name="destination" defaultValue={guidePackage.destination} placeholder="Destination"  className="input" />
          <input name="price" defaultValue={guidePackage.price} placeholder="Price" type="number"  className="input" />
          <input name="departureDate" defaultValue={guidePackage.departureDate} placeholder="Departure Date" type="date"  className="input" />
          <input name="contactNo" defaultValue={guidePackage.contactNo} placeholder="Contact No."  className="input" />
          <input name="guideName"  placeholder="Guide Name" readOnly defaultValue={user?.displayName
}  className="input" />
          <input name="guideEmail"  placeholder="Guide Email" defaultValue={user?.email}  readOnly className="input" />
          <input name="guidePhoto"  placeholder="Guide Photo URL"  readOnly defaultValue={user?.photoURL
} className="input" />

          <textarea name="packageDetails" defaultValue={guidePackage.packageDetails} placeholder="Package Details" rows="4"  className="input md:col-span-2"></textarea>

          <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition md:col-span-2">
            Update Tour Package
          </button>
        </form>
       </div> 
      
    </div>
    );
};

export default UpdatePackage;