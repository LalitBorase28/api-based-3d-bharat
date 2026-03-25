import React, { useState } from "react";
import { Building2, LayoutDashboard, Plus } from "lucide-react";
import DeptForm from "./components/DeptForm";
import DeptTable from "./components/DeptTable";
import DeptDetails from "./components/DeptDetails";
import ProjectStatusTable from "../../components/common/ProjectStatusTable";
import ManagementSearch from "../../components/common/ManagementSearch";
import AddButton from "../../components/common/AddButton";
import clientLogo from "../../assets/dept logo/clientlogo4.png";
import pwdLogo from "../../assets/dept logo/pwd.jpg";

const ManageDept = () => {
  const [showForm, setShowForm] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEntity, setEditingEntity] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [departments, setDepartments] = useState([
    {
      id: 1, dha_id: "DHA002", dept_full_name: "Highway Authority", dept_short_name: "NHAI", status: 2,
      head_name: "Anish Pawar", head_email: "anish@gov.in",
      manager_name: "Suresh Gupta", manager_email: "suresh.gupta@gov.in",
      logo: clientLogo,
      created_at: "2024-03-20",
      address: "123, Highway Bhavan, Sector 5, New Delhi - 110001",
      projects: [
        {
          id: 101, project_id: "PRJ-NH44", project_name: "National Highway 44", project_short_name: "NH44",
          project_description: "North-South Corridor highway development",
          from_km: 0, to_km: 150, from_chainage: 0, to_chainage: 0,
          status: 2, desgin_status: 3, deployement_status: 3, construction_status: 1,
          project_address: "Lalitpur to Nagpur Section", project_created_by: 1,
          project_added_by_id: "DHA002", added_by_name: "Anish Pawar", inserted_on: "2024-03-21 10:30"
        },
        {
          id: 102, project_id: "PRJ-EXP1", project_name: "Expressway 1", project_short_name: "EXP1",
          project_description: "Greenfield expressway construction phase 1",
          from_km: 50, to_km: 120, from_chainage: 0, to_chainage: 0,
          status: 2, desgin_status: 2, deployement_status: 3, construction_status: 1,
          project_address: "Mumbai - Pune Access Controlled", project_created_by: 1,
          project_added_by_id: "DHA002", added_by_name: "Anish Pawar", inserted_on: "2024-03-20 14:15"
        }
      ]
    },
    {
      id: 3, dha_id: "DHA003", dept_full_name: "PWD Dept", dept_short_name: "PWD", status: 2,
      head_name: "Ayush Saxena", head_email: "ayush@gov.in",
      manager_name: "Vikram Singh", manager_email: "vikram@gov.in",
      logo: pwdLogo,
      created_at: "2024-03-15",
      address: "PWD Headquarters, M.G. Road, Pune, Maharashtra - 411001",
      projects: [
        {
          id: 103, project_id: "PRJ-SH8", project_name: "State Highway 8", project_short_name: "SH8",
          project_description: "State highway road widening and resurfacing",
          from_km: 10, to_km: 45, from_chainage: 0, to_chainage: 0,
          status: 2, desgin_status: 3, deployement_status: 3, construction_status: 1,
          project_address: "Nashik Region PWD Section", project_created_by: 1,
          project_added_by_id: "DHA003", added_by_name: "Ayush Saxena", inserted_on: "2024-03-15 09:00"
        }
      ]
    }
  ]);

  const selectedDept = departments.find(d => d.id === selectedId);

  const handleAction = (item, mode) => {
    setEditingEntity(item);
    setIsViewOnly(mode === 'view');
    setShowForm(true);
  };

  const handleSubmitForm = (formData) => {
    console.log("Department Form submitted:", formData);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntity(null);
    setIsViewOnly(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen">
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/50 backdrop-blur-sm p-3 animate-in fade-in" onClick={handleCloseForm}>
          <div className={`bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-200/50`} onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-[#1e293b] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center"><LayoutDashboard size={14} /></div>
                <div>
                  <h1 className="text-[12px] font-bold tracking-tight">{isViewOnly ? 'Department Profile' : editingEntity ? 'Edit Department' : 'Add New Department'}</h1>
                </div>
              </div>
              <button onClick={handleCloseForm} className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-rose-500 text-slate-400 hover:text-white"><Plus className="rotate-45" size={15} /></button>
            </div>
            {isViewOnly ? (
              <DeptDetails data={editingEntity} onCancel={handleCloseForm} />
            ) : (
              <DeptForm initialData={editingEntity} isViewOnly={isViewOnly} onSubmit={handleSubmitForm} onCancel={handleCloseForm} />
            )}
          </div>
        </div>
      )}

      <div className="px-4 sm:px-5 lg:px-6 space-y-4 max-w-[1440px] mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-300/20 shrink-0"><Building2 size={20} /></div>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Department Management</h1>
              <p className="text-[9px] text-slate-500 pt-1 font-medium tracking-wide uppercase">Manage all infrastructure departments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ManagementSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search departments..." />
            <AddButton onClick={() => { setShowForm(true); setIsViewOnly(false); }} label="Department" />
          </div>
        </div>

        <DeptTable
          data={departments}
          searchQuery={searchQuery}
          onView={(item) => handleAction(item, 'view')}
          onEdit={(item) => handleAction(item, 'edit')}
          onToggleStatus={() => { }}
          onDelete={handleDelete}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(prev => prev === id ? null : id)}
        />

        {selectedId && selectedDept && (
          <ProjectStatusTable
            projects={selectedDept.projects || []}
            title={selectedDept.dept_short_name}
          />
        )}
      </div>
    </div>
  );
};

export default ManageDept;
