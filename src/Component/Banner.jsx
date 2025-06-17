import React from 'react';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate=useNavigate()
    return (
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://i.ibb.co/6J7n8M4h/bannerimage-1.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Amazing Tours And Fun</h1>
      <p className="mb-5">
       Discover Your Next Adventure with Our Exclusive Tour Packages!
      </p>
      <button className="btn btn-primary" onClick={()=>navigate("/allpackage")} >Explore All Packages</button>
    </div>
  </div>
</div>
    );
};

export default Banner;