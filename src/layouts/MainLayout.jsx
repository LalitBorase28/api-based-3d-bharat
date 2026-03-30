import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen w-full bg-slate-50/50 overflow-hidden">
      {/* Sidebar - Desktop: Fixed; Mobile: Drawer */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        {/* Navbar */}
        <Navbar onMenuClick={toggleMobileMenu} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
          />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
