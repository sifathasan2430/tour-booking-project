import React from 'react';
import { useNavigate } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Travel Adventure"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl space-y-6 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            <span className="block mb-2 text-amber-400">Discover Your</span>
            Next Great Adventure
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl">
            Experience the world's most breathtaking destinations with our expertly crafted tour packages. 
            Your dream vacation starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => navigate("/allpackage")}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Packages
              <FiArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate("/about")}
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-300"
            >
              Learn About Us
            </button>
          </div>
        </div>

        {/* Scrolling Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;