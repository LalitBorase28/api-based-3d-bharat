import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  UserRound,
  Users,
  FileText,
  UploadCloud,
  Wrench,
  Target,
  LocateFixed,
  LogOut,
  Building2,
  UserCog,
  PlusCircle,
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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <aside className="w-60 bg-[#0D183A] border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo Header */}
      <div className="px-3 h-15 border-b border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1e293b] rounded-lg flex items-center justify-center text-white font-bold">
          3D
        </div>
        <div>
          <h1 className="text-sm font-bold text-white">3D Bharat</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.key}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm group focus:outline-none ${isActive
                      ? "bg-[#f1f5f9] text-[#2563eb]"
                      : "text-white hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span
                      className={`text-sm font-semibold ${isActive ? "text-[#1e293b]" : ""}`}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div>
        <div className="p-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 bg-red-50 focus:outline-none"
          >
            <LogOut size={20} />
            <span className="text-sm font-semibold text-red-600">Logout</span>
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-medium text-center">
            © 2026 3D Bharat
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
