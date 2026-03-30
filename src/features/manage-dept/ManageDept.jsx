import React, { useState, useEffect } from "react";
import DeptBanner from "./components/DeptBanner.jsx";
import DeptForm from "./components/DeptForm.jsx";
import { getDepartments } from "./services/deptService";
import { toast } from "react-toastify";
import { Building2 } from "lucide-react";

import DeptTable from "./components/DeptTable.jsx";
import DeptView from "./components/DeptView.jsx";

const ManageDept = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getDepartments();
      setDepartments(response || []);
    } catch (error) {

      console.error("Fetch Error:", error);
      toast.error("Failed to load departments.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewClick = (dept) => {
    setSelectedDept(dept);
    setIsViewModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <DeptBanner onAddClick={() => setIsModalOpen(true)} />

      {/* Table section */}
      <div className="bg-white rounded-2xl flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Departments...</p>
          </div>
        ) : departments.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-4 bg-slate-50 rounded-full text-slate-300">
              <Building2 className="w-8 h-8" />
            </div>
            <p className="text-slate-400 text-sm font-medium">No departments found.</p>
            <p className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Start by adding your first department</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-6">
            <DeptTable 
              departments={departments} 
              onViewClick={handleViewClick}
            />
            <div className="border-t border-slate-100 px-2">
              <p className="text-[11px] font-bold text-slate-400">
                Showing <span className="text-slate-800">{departments.length}</span> of <span className="text-slate-800">{departments.length}</span> entries
              </p>
            </div>
          </div>
        )}

      </div>

      <DeptForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchData(); // Refresh list on success
        }}
      />

      <DeptView 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        department={selectedDept}
      />
    </div>
  );
};



export default ManageDept;
