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
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0D183A] text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            3D
          </div>
          <span className="text-h1 text-h-inv tracking-tight">3D Bharat</span>
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
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                  >
                    <item.icon
                      size={20}
                      className={`transition-colors ${isActive ? "text-white" : "group-hover:text-slate-200"
                        }`}
                    />
                    <span className={`text-body-inv transition-colors ${isActive ? "text-white" : "group-hover:text-slate-200"}`}>
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
      <div className="p-4 border-t border-white/10 space-y-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-button">Logout</span>
        </button>
        <div className="px-4">
          <p className="text-label-inv opacity-80">
            © 2026 3D Bharat Mi-owner
          </p>
        </div>
      </div>


    </aside>
  );
};

export default Sidebar;

