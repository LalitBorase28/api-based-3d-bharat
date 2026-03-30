import React from "react";
import { Bell, Menu, ShieldCheck } from "lucide-react";
import routeTitles from "../components/routeTitles";
import { useLocation } from "react-router-dom";
import miLogo from "../assets/icons/mtss_logo_2.png";

const Navbar = ({ onMenuClick }) => {
  const userEmail = localStorage.getItem("email") || "User";
  const location = useLocation();

  const currentTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 transition-all duration-300">
      {/* Left Section: Menu Toggle & Title */}
      <div className="flex items-center gap-3 md:gap-4 lg:gap-0">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors lg:hidden active:scale-95"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-h1 text-slate-800 transition-all duration-300">
          {currentTitle}
        </h2>
      </div>

      {/* Right Section: Actions and Profile */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Admin Branding - Desktop Only */}
        <div className="hidden sm:flex items-center gap-4 border-l pl-6 border-slate-100">
          <div className="flex flex-col items-end">
            <span className="text-label text-slate-700">
              Admin
            </span>
            <span className="text-label text-slate-500 mt-1">
              Micro Integrated
            </span>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl p-1.5 border border-slate-100 shadow-sm flex items-center justify-center transition-transform hover:scale-105">
            <img src={miLogo} alt="MI" className="max-w-full max-h-full object-contain" />
          </div>
        </div>


        {/* Branding - Mobile Logo Only */}
        <div className="flex sm:hidden w-8 h-8 bg-white rounded-lg p-1 border border-slate-100 flex items-center justify-center">
          <img src={miLogo} alt="MI" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

