import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import UserAuthContext from "../Context/Context";
import { MdLightMode, MdDarkMode, MdClose, MdMenu } from "react-icons/md";
import { FiLogIn, FiUser, FiPlus, FiSettings, FiLogOut } from "react-icons/fi";
import { RiSuitcaseLine } from "react-icons/ri";

const Navbar = () => {
  const { user, userLogOut, toggleTheme, isDarkMode } = useContext(UserAuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typography and styling
  const navLinkStyles = ({ isActive }) => 
    `px-4 py-3 font-medium text-sm transition-all ${
      isActive 
        ? "text-white bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg" 
        : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  const mobileNavLinkStyles = ({ isActive }) => 
    `block px-6 py-4 text-base font-medium ${
      isActive 
        ? "text-white bg-gradient-to-r from-amber-600 to-amber-500" 
        : "text-gray-700 hover:text-amber-600 dark:text-gray-200 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  const dropdownLinkStyles = "px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <RiSuitcaseLine className="text-amber-600 dark:text-amber-400 text-2xl transition-transform group-hover:rotate-12" />
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Grand<span className="text-amber-600 dark:text-amber-400">Triper</span>
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex ml-12">
              <ul className="flex items-center space-x-1">
                <li>
                  <NavLink to="/" className={navLinkStyles}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allpackage" className={navLinkStyles}>
                    Packages
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <NavLink to="/bookings" className={navLinkStyles}>
                      My Bookings
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/about" className={navLinkStyles}>
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <MdLightMode className="w-5 h-5 text-amber-400" />
              ) : (
                <MdDarkMode className="w-5 h-5" />
              )}
            </button>

            {/* Auth Section */}
            {!user ? (
              <NavLink
                to="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <FiLogIn className="w-4 h-4" />
                <span>Sign In</span>
              </NavLink>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-amber-500 dark:border-amber-400 overflow-hidden">
                    <img
                      alt="User profile"
                      src={user?.photoURL || "https://i.pravatar.cc/300"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline-block">
                    {user?.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </label>
                
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 mt-2 shadow-lg bg-white dark:bg-gray-900 rounded-md w-56 border border-gray-200 dark:border-gray-800"
                >
                  <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {user?.displayName}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </div>
                  </li>
                  <li>
                    <NavLink to="/addtourpackage" className={dropdownLinkStyles}>
                      <FiPlus className="text-amber-600 dark:text-amber-400" />
                      Add Package
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/managepackage" className={dropdownLinkStyles}>
                      <FiSettings className="text-amber-600 dark:text-amber-400" />
                      Manage Packages
                    </NavLink>
                  </li>
                  <li className="border-t border-gray-100 dark:border-gray-800">
                    <button 
                      onClick={userLogOut} 
                      className={`${dropdownLinkStyles} text-red-600 dark:text-red-400 w-full text-left`}
                    >
                      <FiLogOut />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Hotel Style Full Screen Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <NavLink 
                to="/" 
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <RiSuitcaseLine className="text-amber-600 dark:text-amber-400 text-2xl" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  GrandTriper
                </span>
              </NavLink>
              <button
                className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              <NavLink 
                to="/" 
                className={mobileNavLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/allpackage" 
                className={mobileNavLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
              >
                Packages
              </NavLink>
              {user && (
                <NavLink 
                  to="/bookings" 
                  className={mobileNavLinkStyles}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </NavLink>
              )}
              <NavLink 
                to="/about" 
                className={mobileNavLinkStyles}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>

              {/* Mobile Auth Section */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-8">
                {user ? (
                  <>
                    <div className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-amber-500 overflow-hidden">
                        <img
                          alt="User profile"
                          src={user?.photoURL || "https://i.pravatar.cc/300"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user?.displayName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <NavLink 
                      to="/addtourpackage" 
                      className={mobileNavLinkStyles}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Add Package
                    </NavLink>
                    <NavLink 
                      to="/managepackage" 
                      className={mobileNavLinkStyles}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Manage Packages
                    </NavLink>
                    <button
                      onClick={() => {
                        userLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-6 py-4 text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="block mx-4 mt-4 px-6 py-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-center font-medium shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;