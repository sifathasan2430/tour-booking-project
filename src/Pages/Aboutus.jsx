import React, { useContext, useEffect } from 'react';
import UserAuthContext from '../Context/Context';
import axios from 'axios';

const Aboutus = () => {
   
    

   

    return (
       <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">About Our Tour System</h1>
            <p className="py-6 text-xl">
              Discover the world with our comprehensive tour management platform that connects travelers with unforgettable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4 text-lg">
              Founded in 2023, our tour system was created to revolutionize the way people explore the world. We noticed a gap in the market for a seamless, user-friendly platform that connects travelers with unique experiences.
            </p>
            <p className="text-lg">
              What started as a small project has grown into a comprehensive system serving thousands of travelers worldwide, offering everything from city tours to adventurous expeditions.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21" 
              alt="Travel team" 
              className="rounded-lg shadow-2xl w-full object-cover h-96"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Global Network</h3>
                <p>Access to tours and experiences in over 100 countries worldwide with local experts.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Verified Quality</h3>
                <p>Every tour and guide is carefully vetted to ensure exceptional quality and safety standards.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-accent mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Best Value</h3>
                <p>Competitive pricing with no hidden fees and a best-price guarantee for all our tours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Maria Garcia", role: "Tour Operations", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "James Wilson", role: "Customer Experience", img: "https://randomuser.me/api/portraits/men/75.jpg" }
            ].map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={member.img} alt={member.name} className="rounded-xl w-32 h-32 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="text-neutral">{member.role}</p>
                  <div className="card-actions mt-4">
                    <button className="btn btn-sm btn-outline">Contact</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="hero bg-primary text-primary-content rounded-lg">
          <div className="hero-content text-center py-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
              <p className="mb-8 text-xl">
                Join thousands of travelers who are already discovering the world with our platform.
              </p>
              <button className="btn btn-secondary btn-lg">Browse Tours Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Aboutus;