
import React, { useContext, useEffect, useState } from 'react';
import UserAuthContext from '../Context/Context';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Customhook/useAxiosSecure';
import Loader from '../Component/Loader';

const Mybooking = () => {
    const {user}=useContext(UserAuthContext)
    const axiosSecure=useAxiosSecure()
    const [booking,setBooking]=useState([])
     useEffect(()=>{
          axiosSecure.get('/bookings',{params:{
            email:user?.email
          }}).then(res=>{
            setBooking(res.data)
            
     }
        ).catch(err=>console.log(err))
     },[])
     const updateStatus=(e,id)=>{
       
        const status=e.target.value
        axiosSecure.patch("/updatestatus",{status},{
            params:{
                id
            }
        }).then(res=>{
          if  (res.data.modifiedCount){
            Swal.fire({
  title: "Status update",
  icon: "success",
  draggable: true
});
          }
        }).catch(err=>console.log(err))
        
        
        
     }
    return (
       <div className="overflow-x-auto">
     
       { booking.length >0 ? <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>NO</th>
              <th>GuideInfo</th>
              <th>Tour Name</th>
              <th>Departure Date
</th>
              <th>Departure location
</th>
<th>Destination

</th>
<th>
    Status
</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((items, index) => (
              <tr key={items._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={items.guidePhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{items.guide_name}</div>
                      <div className="text-sm opacity-50">
                        {items.guide_email}
                      </div>
                      <div className="text-sm opacity-50">
                        {items.contactNo}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{items.tour_name}</td>
                <td>{items.departure_date
}</td>
<td>{items.departureLocation}</td>
<td>{items.destination}</td>
                <td>
                  <select onChange={(e)=>updateStatus(e,items._id)} defaultValue={items.status} className="select">
  <option disabled={true}>{items?.status}</option>
  <option> Completed</option>
 
</select>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table> : <tr><td>Server is loading or on Data Added</td></tr>}
      
    </div>
    );
};

export default Mybooking;