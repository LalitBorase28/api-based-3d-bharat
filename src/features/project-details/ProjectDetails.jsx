import React, { useState, useMemo } from "react";
import { Settings, Layers } from "lucide-react";
import { departments, contractors, projects } from "../../data/mockData";

// Components
import SelectionFlow from "./components/SelectionFlow";
import ProjectSelectionTable from "./components/ProjectSelectionTable";
import WorkspaceHeader from "./components/WorkspaceHeader";
import ProjectDocuments from "./components/ProjectDocuments";
import ContractorOversight from "./components/ContractorOversight";
import EmployeeList from "./components/EmployeeList";

const ProjectDetails = () => {
  // Selection state
  const [selectionType, setSelectionType] = useState(""); // "dept" or "cont"
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  // UI flow state
  const [isProjectFormVisible, setIsProjectFormVisible] = useState(true);
  const [viewingEmployeesFor, setViewingEmployeesFor] = useState(null);
  const [activeTab, setActiveTab] = useState("contractors"); // "contractors", "documents"

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    if (!selectionType || !selectedEntityId) return [];
    return projects.filter((prj) => {
      if (selectionType === "dept") {
        return prj.departmentId === parseInt(selectedEntityId);
      } else {
        return prj.contractorId === parseInt(selectedEntityId);
      }
    });
  }, [selectionType, selectedEntityId]);

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === parseInt(selectedProjectId));
  }, [selectedProjectId]);

  const handleReset = () => {
    setSelectionType("");
    setSelectedEntityId("");
    setSelectedProjectId("");
    setViewingEmployeesFor(null);
    setIsProjectFormVisible(true);
    setActiveTab("contractors");
  };

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-360 mx-auto px-4">
        {isProjectFormVisible ? (
          /* STAGE 1: Selection Flow */
          <div className="space-y-6">
            <SelectionFlow
              selectionType={selectionType}
              selectedEntityId={selectedEntityId}
              onTypeChange={setSelectionType}
              onEntityChange={(id) => {
                setSelectedEntityId(id);
                setSelectedProjectId("");
              }}
              contractors={contractors}
              departments={departments}
            />

            {selectedEntityId ? (
              <ProjectSelectionTable
                projects={filteredProjects}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
                onViewProject={(id, tab = "contractors") => {
                  setSelectedProjectId(id);
                  setIsProjectFormVisible(false);
                  setViewingEmployeesFor(null);
                  setActiveTab(tab);
                }}
              />
            ) : (
              /* Initial Empty State */
              <div className="bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm border-dashed">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                  <Settings size={24} />
                </div>
                <div className="max-w-xs space-y-1">
                  <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-tight">
                    Ready for Selection
                  </h3>
                  <p className="text-[11px] text-slate-800 leading-relaxed font-bold">
                    Choose a Category and Entity above to browse and select
                    projects.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="text-[10px] font-bold text-slate-800 hover:text-indigo-600 px-4 py-1.5 flex items-center gap-1.5 border border-transparent hover:border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <Settings size={12} />
                RESET SELECTION
              </button>
            </div>
          </div>
        ) : (
          /* STAGE 2: Project Workspace */
          selectedProject && (
            <div className="space-y-6">
              <WorkspaceHeader
                project={selectedProject}
                onBack={() => setIsProjectFormVisible(true)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Section Switcher */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "documents" && (
                  <ProjectDocuments documents={selectedProject.documents} />
                )}

                {activeTab === "contractors" && (
                  <div className="space-y-4">
                    {!viewingEmployeesFor ? (
                      <ContractorOversight
                        contractors={selectedProject.projectContractors}
                        onViewEmployees={setViewingEmployeesFor}
                      />
                    ) : (
                      <EmployeeList
                        contractor={viewingEmployeesFor}
                        onBack={() => setViewingEmployeesFor(null)}
                        employeesPerPage={10}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
