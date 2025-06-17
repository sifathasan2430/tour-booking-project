import React, {  useContext,  useState } from 'react';
import { useLoaderData } from 'react-router';
import UserAuthContext from '../Context/Context';

import Swal from 'sweetalert2';
import useAxiosSecure from '../Customhook/useAxiosSecure';


const PackageDetail = () => {
  const axiosSecure=useAxiosSecure()
 const packageInfo=useLoaderData()
 

  const [date,setDate]=useState(new Date(Date.now()).toLocaleDateString())
   
 const {user}=useContext(UserAuthContext)
   
    
  
  
   const [counter,setCounter]=useState(packageInfo.bookingCount)
  
  
  
   
   const handler=(e)=>{
    e.preventDefault()
    const form=e.target
    const formdata=new FormData(form)
    const bookingData=Object.fromEntries(formdata.entries())
    bookingData.tour_id=packageInfo._id
    bookingData.guide_name=packageInfo.guideName
    bookingData.guide_email=packageInfo.guideEmail
    bookingData.status='pending'
    bookingData.departure_date=packageInfo.departureDate
    
    axiosSecure.post("/bookings",bookingData).then(res=>{
      
      if  (res.data.insertedId){


        axiosSecure.post(`/package/${packageInfo._id}`).then(res=>{
         if (res.data.modifiedCount){
             setCounter(prev=>prev+1)
         }
        }
        )
        Swal.fire({
  title: "You have successfully add a Booking.For confirm your booking go to My booking page and update your status",
  icon: "success",
  draggable: true
});
      }
}).catch(err=>{
  Swal.fire({
  icon: "error",
  title: "Oops...Not Booked",
  text: err,
  footer: '<a href="#">Why do I have this issue?</a>'
});
})
   }
   
    return (
        <div class="p-6 max-w-5xl mx-auto space-y-6">

  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold">{packageInfo.
tourName
    }</h1>
    <span class="bg-blue-600 dark:text-white text-sm font-medium px-3 py-1 rounded">{packageInfo.duration}
    </span>
  </div>

 
  <div class="border rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 bg-white shadow">
    <div><p class="font-medium">Accommodation</p><p>5 Stars Hotels</p></div>
    <div><p class="font-medium">Departure City</p><p>{
packageInfo.departureLocation}</p></div>
    <div><p class="font-medium">Arrival City</p><p>{packageInfo.
destination
}</p></div>
    <div><p class="font-medium">Best Season</p><p>Autumn</p></div>
    <div className='flex flex-col justify-center items-center'>
        <div>
    <img className='w-10 rounded-4xl' src={packageInfo.guidePhoto} alt="" />
</div>
        <div><p class="font-medium">Guide</p><p>Guide:{packageInfo.
guideName
}</p>
<p class="font-medium">Guide</p><p>GuideMail:{packageInfo.
guideEmail
}</p></div>

</div>
    <div><p class="font-medium">Language</p><p>English, Deutsch</p></div>
    <div><p class="font-medium">Meals</p><p>Breakfast and Dinner</p></div>
    <div><p class="font-medium">Tour Availability</p><p>Available</p></div>
    <div><p class="font-medium">Transportation</p><p>Bus, Taxi</p></div>
    <div><p class="font-medium">Walking Hours</p><p>5–6 Hours</p></div>
    <div><p class="font-medium">Minimum Age</p><p>12</p></div>
    <div><p class="font-medium">Maximum Age</p><p>65</p></div>
    <div><p class="font-medium">Group Size</p><p>6 - 10</p></div>
    <div><p class="font-medium">Destinations</p></div>
    <div><p class="font-medium">Date: {packageInfo.
created_at
}</p></div>
    <div class="col-span-2"><p class="font-medium">Trip Type</p><p>Budget Travel, Nature Walk, Weekend Trips</p></div>
    <div class="col-span-2"><p class="font-medium">Activities</p><p>Hiking, Kayaking, Paragliding, Road Cycling, Skiing</p></div>
  </div>

  
  <div>
    <div class="flex space-x-4 border-b pb-2">
      <button class="text-blue-600 border-b-2 border-blue-600 font-medium">Overview</button>
      <button class="dark:text-white">Itinerary</button>
      <button class="dark:text-white">Cost</button>
      <button class="dark:text-white">FAQs</button>
      <button class="dark:text-white">Map</button>
    </div>

   
    <div class="mt-4 space-y-4">
      <div>
        <h2 class="text-lg   font-semibold">Overview</h2>
        <p class="text-sm dark:text-white mt-1">
         {packageInfo.
packageDetails}
        </p>
        <p class="text-sm dark:text-white mt-2">
          Near the center of the square stood the “Great Ming Gate”... never part of the city wall but stood as an entrance...
        </p>
      </div>

     
      <div>
        <h3 class="text-base font-semibold">Trip Highlights</h3>
        <ul class="space-y-1 mt-2 text-sm dark:text-white">
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" /></svg>
            Trek to the world-famous Everest Base Camp
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" /></svg>
            Enjoy the amazing view of the Himalayas from Kala Patthar
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" /></svg>
            Travel through the Sherpa villages of Namche, Khumjung, Khunde, and Dingboche
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" /></svg>
            Visit Tengboche the biggest and oldest monastery in the region.
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="shadow-md rounded-2xl p-5 w-full max-w-sm mx-auto flex flex-col items-center text-center space-y-4 border">
      <div className="text-xl font-semibold text-black">Cost: ${packageInfo.price}/Adult</div>
      <div className="text-sm text-gray-500">
        Booked: <span className="font-medium">{counter
}</span> times
      </div>
      <div className="divider-secondary "></div>
      <div>
        <button
       onClick={()=>document.getElementById('my_modal_1').showModal()}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Book Now
      </button>
      <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    
   <div class="bg-gray-100 p-6 max-w-4xl mx-auto rounded-md shadow-md">
  <h2 class="text-xl text-black font-semibold mb-6">
    You are booking for : <span class="font-bold text-2xl text-black">{packageInfo.tourName}</span>
  </h2>

  
</div>
    <div className="modal-action">
      
          <form method="dialog" onSubmit={handler} class="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Tour Package Name *</label>
      <input type="text" name='tour_name' defaultValue={packageInfo.tourName} class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-500" readOnly />
    </div>

 
    <div>
      <label class="block text-sm font-medium text-gray-700"> Name *</label>
      <input type="text" defaultValue={user.displayName
} name='buyer_name' class="mt-1 text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
    </div>

   
    <div>
      <label class="block text-sm font-medium text-gray-700">Email *</label>
      <input type="email" defaultValue={user.email} name='buyer_email' class="mt-1 text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

   
    <div>
      <label class="block text-sm font-medium text-gray-700">Booking Date </label>
      <input  type="text" defaultValue={date} name='booking_date:'  class="mt-1 text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    

    
    <div className='col-span-2'>
      <label class="block text-sm font-medium text-gray-700">Additional Note</label>
      <textarea rows="3" name='notes' class="mt-1 w-full text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    </div>
    

   
   

    
   

  <div className='text-2xl text-black flex justify-between items-center'>
    <h1>Price:{packageInfo.price}</h1>
     
  </div>
  <div>
     <button onClick={()=>document.getElementById('my_modal_1').close()} className='btn btn-primary w-full'  type='submit'>Submit</button>
   </div>
   
  </form>
       
      
    </div>
  </div>
</dialog>
      </div>
    </div>
</div>

    );
};

export default PackageDetail;