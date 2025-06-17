import React, { useContext } from 'react';
import UserAuthContext from '../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Customhook/useAxiosSecure';


const AddTourPackage = () => {
    const {user}=useContext(UserAuthContext)
    const axiosSecure=useAxiosSecure()
const formHandler=(e)=>{
    e.preventDefault()
    const form=e.target
    const formdata=new FormData(form)
    const inputsData=Object.fromEntries(formdata.entries())
    inputsData.bookingCount=0;
    inputsData.created_at=new Date().toLocaleString()
    
    axiosSecure.post("/addtourpackage",inputsData).then(res=>{
     if (res.data.insertedId){
      Swal.fire({
  title: "Data added successfully",
  icon: "success",
  draggable: true
});
     }
    }).catch(err=>console.log(err))
}
    return (
        <div className="w-full">
     

    
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 shadow-lg rounded-xl mb-10">
        <h2 className="text-2xl font-semibold  text-black text-center mb-6">Add Tour Package</h2>

        <form onSubmit={formHandler}  className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
           <input name="tourName"  placeholder="Tour Name"  className="input" />
          <input name="image" placeholder="Image URL"  className="input" />
          <input name="duration" placeholder="Duration (e.g. 3 Days 2 Nights)"  className="input" />
          <input name="departureLocation" placeholder="Departure Location"  className="input" />
          <input name="destination" placeholder="Destination"  className="input" />
          <input name="price" placeholder="Price" type="number"  className="input" />
          <input name="departureDate" placeholder="Departure Date" type="date"  className="input" />
          <input name="contactNo" placeholder="Contact No."  className="input" />
          <input name="guideName" placeholder="Guide Name" readOnly defaultValue={user?.displayName
}  className="input" />
          <input name="guideEmail" placeholder="Guide Email" defaultValue={user?.email}  readOnly className="input" />
          <input name="guidePhoto" placeholder="Guide Photo URL"  readOnly defaultValue={user?.photoURL
} className="input" />

          <textarea name="packageDetails" placeholder="Package Details" rows="4"  className="input md:col-span-2"></textarea>

          <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition md:col-span-2">
            Add Tour Package
          </button>
        </form>
       </div> 
      
    </div>
    );
};

export default AddTourPackage;