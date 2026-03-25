import React, { useState } from "react";
import { UserCog, LayoutDashboard, Plus } from "lucide-react";
import ContractorForm from "./components/ContractorForm";
import ContractorTable from "./components/ContractorTable";
import ContractorDetails from "./components/ContractorDetails";
import ProjectStatusTable from "../../components/common/ProjectStatusTable";
import ManagementSearch from "../../components/common/ManagementSearch";
import AddButton from "../../components/common/AddButton";
import lntLogo from "../../assets/cont logo/L&T.png";
import tataLogo from "../../assets/cont logo/tata.jpg";

const ManageContractor = () => {
  const [showForm, setShowForm] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEntity, setEditingEntity] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [contractors, setContractors] = useState([
    {
      id: 1, cont_id: "C001", cont_name: "L&T Construction", cont_short_name: "L&T", status: 2,
      head_name: "Rajesh Kumar", head_email: "rk@lnt.com",
      manager_name: "Amit Patel", manager_email: "amit.patel@lnt.com",
      logo: lntLogo,
      created_at: "2024-03-21",
      address: "L&T House, N.M. Marg, Ballard Estate, Mumbai - 400001",
      projects: [
        {
          id: 201, project_id: "PRJ-CRP", project_name: "Coastal Road Project", project_short_name: "CRP-L&T",
          project_description: "8-lane coastal road project reclamation",
          from_km: 5, to_km: 15, from_chainage: 0, to_chainage: 0,
          status: 2, desgin_status: 3, deployement_status: 3, construction_status: 2,
          project_address: "Worli to Marine Drive Phase 1", project_created_by: 2,
          project_added_by_id: "C001", added_by_name: "Rajesh Kumar", inserted_on: "2024-03-21 11:20"
        }
      ]
    },
    {
      id: 2, cont_id: "C002", cont_name: "Tata Projects", cont_short_name: "TATA", status: 2,
      head_name: "Sanjay Singh", head_email: "sanjay@tata.com",
      manager_name: "Deepak Verma", manager_email: "deepak.verma@tata.com",
      logo: tataLogo,
      created_at: "2024-03-18",
      address: "Bombay House, 24, Homi Mody Street, Fort, Mumbai - 400001",
      projects: [
        {
          id: 202, project_id: "PRJ-METB", project_name: "Metro Corridor B", project_short_name: "MET-B",
          project_description: "Elevated metro line corridor construction",
          from_km: 0, to_km: 12, from_chainage: 0, to_chainage: 0,
          status: 2, desgin_status: 2, deployement_status: 3, construction_status: 1,
          project_address: "North-East Metro Link Line 4", project_created_by: 2,
          project_added_by_id: "C002", added_by_name: "Sanjay Singh", inserted_on: "2024-03-18 16:45"
        }
      ]
    }
  ]);

  const selectedCont = contractors.find(c => c.id === selectedId);

  const handleAction = (item, mode) => {
    setEditingEntity(item);
    setIsViewOnly(mode === 'view');
    setShowForm(true);
  };

  const handleSubmitForm = (formData) => {
    console.log("Contractor Form submitted:", formData);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntity(null);
    setIsViewOnly(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contractor?")) {
      setContractors(prev => prev.filter(item => item.id !== id));
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
                  <h1 className="text-[12px] font-bold tracking-tight">{isViewOnly ? 'Contractor Profile' : editingEntity ? 'Edit Contractor' : 'Add New Contractor'}</h1>
                </div>
              </div>
              <button onClick={handleCloseForm} className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-rose-500 text-slate-400 hover:text-white"><Plus className="rotate-45" size={15} /></button>
            </div>
            {isViewOnly ? (
              <ContractorDetails data={editingEntity} onCancel={handleCloseForm} />
            ) : (
              <ContractorForm initialData={editingEntity} isViewOnly={isViewOnly} onSubmit={handleSubmitForm} onCancel={handleCloseForm} />
            )}
          </div>
        </div>
      )}

      <div className="px-4 sm:px-5 lg:px-6 space-y-4 max-w-[1440px] mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-300/20 shrink-0"><UserCog size={20} /></div>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 leading-tight">Contractor Management</h1>
              <p className="text-[9px] text-slate-500 pt-1 font-medium tracking-wide uppercase">Manage all project contractors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ManagementSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search contractors..." />
            <AddButton onClick={() => { setShowForm(true); setIsViewOnly(false); }} label="Contractor" />
          </div>
        </div>

        <ContractorTable
          data={contractors}
          searchQuery={searchQuery}
          onView={(item) => handleAction(item, 'view')}
          onEdit={(item) => handleAction(item, 'edit')}
          onToggleStatus={() => { }}
          onDelete={handleDelete}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(prev => prev === id ? null : id)}
        />

        {selectedId && selectedCont && (
          <ProjectStatusTable
            projects={selectedCont.projects || []}
            title={selectedCont.cont_short_name}
          />
        )}
      </div>
    </div>
  );
};

export default ManageContractor;
