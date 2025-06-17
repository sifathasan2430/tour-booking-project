import React, { useEffect, useState } from 'react';
import Banner from '../Component/Banner';
import TourCardGrid from '../Component/TourCard';

import Loader from '../Component/Loader';
import Gallery from '../Component/Gallery';
import { useLoaderData, useNavigate } from 'react-router';


const Home = () => {
    const faqs = [
  {
    question: "What is included in a tour package?",
    answer:
      "Our tour packages typically include accommodation, guided tours, transportation, and some meals. Specific inclusions may vary by package — check the details before booking."
  },
  {
    question: "How can I book a tour package?",
    answer:
      "To book a package, simply log in, browse the available tours, and click the 'Book Now' button on your selected package. You'll receive confirmation once the booking is successful."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking based on the package provider's policy. Visit your 'My Bookings' page to manage your reservations."
  },
  {
    question: "Is online payment available for tour bookings?",
    answer:
      "Currently, our platform supports booking requests only. Payment is handled directly by the tour operator or at the time of travel (future versions will support online payments)."
  },
  {
    question: "How do I contact the tour package provider?",
    answer:
      "Each package detail page includes contact info for the provider. You can use that to reach out directly for any specific inquiries or customizations."
  }
];
    
    const navigate=useNavigate()
    const tours=useLoaderData()
   
    return (
        <div>
            <Banner></Banner> 
           <div className='mt-10'>
             
     
  {tours.length>0 ?  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {  tours.splice(0,6).map(tour=>  <TourCardGrid key={tour._id} tour={tour

        }></TourCardGrid>)}
          </div>:<Loader></Loader>}
          <div className='mt-15'>
            <button onClick={()=>navigate("/allpackage")} className='btn btn-secondary'>Show All</button>
          </div>
           </div>
           <div className='  '>
            <h1 className='text-center py-10 text-5xl font-bold'>Gallery</h1>
            <Gallery></Gallery>
           </div>
           <div className='my-10'>
            <h1 className='text-6xl my-10 font-bold text-center'>FQA</h1>
       { faqs.map(items=>    <div className="collapse  max-w-full my-1 mx-auto collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2"  />
  <div className="collapse-title font-semibold">{items.question}</div>
  <div className="collapse-content text-sm">{items.answer}</div>
</div>)}

           </div>
        </div>
    );
};

export default Home;