import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import { useState } from "react";

const TourCardGrid = ({ tour }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
console.log(tour)
  return (
    <NavLink 
      to={`/packageDetail/${tour._id}`} 
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
    >
      {/* Image with Overlay Effects */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={tour.images}
          alt={tour.tourName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Top-right Favorite & Discount Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2 bg-white/90 rounded-full backdrop-blur-sm shadow-sm hover:bg-white transition"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className="text-gray-600" size={16} />
            )}
          </button>
          
          {tour.discount > 0 && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
              -{tour.discount}%
            </span>
          )}
        </div>
        
        {/* Bottom-left Rating & Price */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full shadow-sm">
          <FaStar className="text-amber-400" size={14} />
          <span className="text-sm font-semibold text-gray-800">{tour.rating }</span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Tour Title & Location */}
        <div className="mb-2">
          <h3 className="text-start text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
            {tour.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <FaMapMarkerAlt className="text-amber-500" size={12} />
            <span>{tour.location }</span>
          </div>
        </div>
        
        {/* Tour Details (Icons + Info) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaClock className="text-amber-500" size={12} />
            <span>{tour.duration  }</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaCalendarAlt className="text-amber-500" size={12} />
            <span>
              {new Date(tour.departureDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaUserAlt className="text-amber-500" size={12} />
            <span>{tour.groupSize }</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{tour.difficulty }</span>
          </div>
        </div>
        
        {/* Price & Book Now Button */}
        <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-3">
          <div>
            {tour.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">${Math.round(tour.price * (1 - tour.discount / 100))}</span>
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">${tour.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">${tour.price}</span>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">per person</p>
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md">
            ViewDetails
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default TourCardGrid;