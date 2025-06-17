import React, { useContext } from "react";
import { NavLink } from "react-router";
import UserAuthContext from "../Context/Context";
import { MdLightMode } from "react-icons/md";

const Navbar = () => {
    const {user,userLogOut,toggleTheme }=useContext(UserAuthContext)
   
  const links = <>
    
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allpackage"}>All Packages</NavLink>
      </li>
      {
        user && <li>
        <NavLink to={"/bookings"}>My Bookings</NavLink>
      </li>
      }
      <li>
        <NavLink to={"/about"}>About Us </NavLink>
      </li>
    </>

      const dropDownMenu=<>
     <li>
        <NavLink to={"/addtourpackage"}> Add Package  </NavLink>
      </li>
      <li>
        <NavLink to={"/managepackage"}> Manage My Packages  </NavLink>
      </li>
      <li>
        <NavLink onClick={()=>userLogOut()} > Logout
 </NavLink>
      </li>
    </>
  
  
  return (
    <div className="navbar bg-base-100 dark:bg-gray-700 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  w-52 p-2 shadow-lg"
          >
          {links}
          </ul>
        </div>
        <div className="flex items-center gap-2">
            <img className="hidden md:flex md:w-auto h-5" src='https://i.ibb.co/5Xf5Qmjy/logo.png' alt="" />
<h1 className="text-2xl font-bold">Triper</h1>
        </div>
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            {links}
        </ul>
      </div>
      <div className="navbar-end">

        <button  onClick={toggleTheme} className="btn rounded-4xl mx-2 "> {<MdLightMode />}</button>
      { !user ? <button className="btn btn-primary">
          <NavLink to={'/login'} >LogIn</NavLink>
        </button> :
         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL

} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {dropDownMenu}
      </ul>
    </div>
}
      </div>
    </div>
  );
};

export default Navbar;
