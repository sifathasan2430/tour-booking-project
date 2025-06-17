

 import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router";
import Loader from "./Loader";

const TourCardGrid = ({tour}) => {
   
   
  return (
   
       
          <div  className=" bg-white  dark:text-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
            <img src={tour.image} alt={tour.tourName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="text-xl text-start font-semibold text-gray-800">{tour.tourName}</h3>
               
<FaHeart size={25} className="text-[#1ca8cb]" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img src={tour.guidePhoto} alt={tour.guideName} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm text-gray-600">Guide: {tour.guideName}</span>
              </div>
             <div className="flex justify-between items-baseline-last">
               <div className="flex flex-col items-start gap-3">
                   <p className="text-sm text-gray-700 mt-2">⏳ Duration: {tour.duration}</p>
             
              
              <p className="text-sm text-gray-700">📅 DepartureDate:{ new Date(tour.departureDate).toDateString()}</p>
              <p className="text-sm text-gray-700">💰 Price:BDT {tour.price}</p>
               </div>
                <div>
              <button  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl transition duration-200">
               <NavLink to={`/packageDetail/${tour._id}`}  >View Details</NavLink> 
              </button>
            </div>
             </div>
              
            </div>
           
          </div>
      
        
      

   
  
    
  );
};

export default TourCardGrid;