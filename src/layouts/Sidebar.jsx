import React from "react";
import {
  LayoutDashboard,
  LogOut,
  Building2,
  UserCog,
  FileText,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      { name: "Dashboard", key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
      {
        name: "Manage Department",
        key: "manage-dept",
        path: "/manage-dept",
        icon: Building2,
      },
      {
        name: "Manage Contractor",
        key: "manage-contractor",
        path: "/manage-contractor",
        icon: UserCog,
      },
      {
        name: "Project Details",
        key: "project-details",
        path: "/project-details",
        icon: FileText,
      },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#020617] text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#6366f1] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
            3D
          </div>
          <span className="text-h1 text-white tracking-tight">3D Bharat</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg lg:hidden transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-label-inv">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                  >
                    <item.icon
                      size={20}
                      className={`transition-colors ${isActive ? "text-indigo-400" : "group-hover:text-slate-200"
                        }`}
                    />
                    <span className={`text-[13px] font-semibold transition-colors ${isActive ? "text-indigo-300" : "group-hover:text-slate-200"}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-2 mt-auto bg-slate-900/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all duration-250 group border border-transparent hover:border-rose-500/20 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">Logout Session</span>
          </div>
        </button>
        <div className="px-4 py-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] opacity-70">
            @2026 3D BHARAT MI-OWNER
          </p>
        </div>
      </div>


    </aside>
  );
};

export default Sidebar;

