import React, { useState } from "react";
import { MapPin, User2, Layers, Eye, UserCog, FileText, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { formatKMCH, thClass } from "../utils/helpers";

const ProjectSelectionTable = ({
    projects,
    selectedProjectId,
    onSelectProject,
    onViewProject
}) => {
    const [viewingProjectDetails, setViewingProjectDetails] = useState(null);

    return (
        <div className="space-y-4">
            {/* Project Details Modal */}
            <ProjectDetailsModal 
                project={viewingProjectDetails}
                isOpen={!!viewingProjectDetails}
                onClose={() => setViewingProjectDetails(null)}
                onViewProject={onViewProject}
            />
            <div className="flex items-center gap-3 mb-4 px-1">
                <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">Step 3: Choose Project to View Details</h3>
                <span className="text-[10px] font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">{projects.length} Projects</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr className="bg-slate-900">
                                <th className={`${thClass} w-12 text-center`}>#</th>
                                <th className={`${thClass} min-w-[200px]`}>Project Name</th>
                                <th className={thClass}>Km Range</th>
                                <th className={`${thClass} text-center`}>Status</th>
                                <th className={`${thClass} text-center`}>Design</th>
                                <th className={`${thClass} text-center`}>Deployment</th>
                                <th className={`${thClass} text-center`}>Construction</th>
                                <th className={`${thClass} min-w-[130px]`}>Added By</th>
                                <th className={`${thClass} text-right`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((prj, idx) => (
                                <tr
                                    key={prj.id}
                                    onClick={() => onSelectProject(prj.id.toString())}
                                    className={`border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50/70 transition-colors ${selectedProjectId === prj.id.toString() ? 'bg-indigo-50/60' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                                >
                                    <td className="px-3 py-3.5 text-center border-r border-slate-100 font-mono text-[11px] font-bold text-slate-800">
                                        {String(idx + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-3 py-3.5 border-r border-slate-100">
                                        <div className="text-[12px] font-semibold text-slate-800 leading-snug">{prj.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[8.5px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/50 uppercase tracking-wider">{prj.project_id}</span>
                                            {prj.project_description && (
                                                <span className="text-[9px] text-slate-800 italic truncate max-w-[150px]">{prj.project_description}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5 border-r border-slate-100">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={11} className="text-slate-800 shrink-0" />
                                            <span className="text-[11px] font-semibold text-slate-800 tabular-nums">
                                                {formatKMCH(prj.from_km, prj.from_chainage)} — {formatKMCH(prj.to_km, prj.to_chainage)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5 text-center border-r border-slate-100">
                                        <div className="flex justify-center"><StatusBadge status={prj.status} type="general" /></div>
                                    </td>
                                    <td className="px-3 py-3.5 text-center border-r border-slate-100">
                                        <div className="flex justify-center"><StatusBadge status={prj.designStatus} type="phase" /></div>
                                    </td>
                                    <td className="px-3 py-3.5 text-center border-r border-slate-100">
                                        <div className="flex justify-center"><StatusBadge status={prj.deploymentStatus} type="phase" /></div>
                                    </td>
                                    <td className="px-3 py-3.5 text-center border-r border-slate-100">
                                        <div className="flex justify-center"><StatusBadge status={prj.constructionStatus} type="phase" /></div>
                                    </td>
                                    <td className="px-3 py-3.5 border-r border-slate-100">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                                                    <User2 size={10} className="text-indigo-400" />
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-800 truncate max-w-[100px]">{prj.addedBy}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 opacity-60 ml-0.5">
                                                <Calendar size={10} className="text-slate-800 shrink-0" />
                                                <span className="text-[9px] font-medium text-slate-800 tabular-nums uppercase tracking-tight">{prj.inserted_on}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* View Project Details */}
                                            <button
                                                title="View Technical Details"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setViewingProjectDetails(prj);
                                                }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100"
                                            >
                                                <Eye size={14} strokeWidth={2.5} />
                                            </button>

                                            {/* Show Contractor */}
                                            <button
                                                title="View Contractor Details"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onViewProject(prj.id.toString(), 'contractors');
                                                }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-800 hover:bg-slate-900 hover:text-white transition-all shadow-sm border border-slate-200"
                                            >
                                                <UserCog size={14} strokeWidth={2.5} />
                                            </button>

                                            {/* Check Documents */}
                                            <button
                                                title="Check Project Documents"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onViewProject(prj.id.toString(), 'documents');
                                                }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100"
                                            >
                                                <FileText size={14} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-30">
                                            <Layers size={40} className="text-slate-300" />
                                            <p className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">No Projects Found for Selection</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectSelectionTable;
