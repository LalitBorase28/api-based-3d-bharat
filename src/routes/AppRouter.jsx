import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../features/auth/Login";
import Home from "../pages/Home";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ManageDeptPage from "../pages/ManageDeptPage";
import ManageContractorPage from "../pages/ManageContractorPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Root is now the Login / Home Page */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Protected Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manage-dept" element={<ManageDeptPage />} />
            <Route path="/manage-contractor" element={<ManageContractorPage />} />
            <Route path="/project-details" element={<ProjectDetailsPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
