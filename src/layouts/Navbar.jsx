import React from "react";
import { Bell, Download, ShieldCheck } from "lucide-react";
import routeTitles from "../components/routeTitles";
import { useLocation } from "react-router-dom";
import miLogo from "../assets/icons/mtss_logo_2.png";

const Navbar = () => {
  const userEmail = localStorage.getItem("email") || "User";
  const location = useLocation();

  const currentTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-15 bg-white border-b border-slate-300 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Page Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-[#1e293b]">{currentTitle}</h2>
      </div>

      {/* Right: Actions and Profile */}
      <div className="flex items-center gap-6">
        {/* Admin Branding */}
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest leading-none">Admin</span>
              <span className="text-[11px] font-semibold text-slate-700 tracking-wider mt-0.5">Micro Integrated</span>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg p-1 border border-slate-100 shadow-sm flex items-center justify-center">
              <img src={miLogo} alt="MI" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Navbar;
