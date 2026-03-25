import React from "react";
import { X, ArrowRight, MapPin, Info, User2, Building2, Calendar, Layers, Hammer, Rocket, CheckCircle2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ProjectDetailsModal = ({ project, isOpen, onClose, onViewProject }) => {
    if (!project || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-slate-900 px-5 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-white border border-white/10">
                            <Info size={14} />
                        </div>
                        <div>
                            <h2 className="text-[13px] font-bold text-white uppercase tracking-tight leading-none">{project.project_name || project.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[8px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-widest">{project.project_short_name || project.shortName}</span>
                                <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-widest">ID: {project.project_id}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                    {/* KM Range — inline row */}
                    <div className="flex items-center gap-2 bg-indigo-50/60 rounded-lg px-3 py-2 border border-indigo-100">
                        <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider shrink-0">Range</span>
                        <span className="text-[12px] font-mono font-bold text-indigo-700">KM {project.from_km}+{String(project.from_chainage).padStart(3, '0')}</span>
                        <ArrowRight size={12} className="text-indigo-400 shrink-0" />
                        <span className="text-[12px] font-mono font-bold text-indigo-700">KM {project.to_km}+{String(project.to_chainage).padStart(3, '0')}</span>
                    </div>

                    {/* Description */}
                    {project.project_description && (
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed pl-3 border-l-2 border-indigo-200 italic">{project.project_description}</p>
                    )}

                    {/* Status — horizontal chips */}
                    <div>
                        <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Phase Status</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { label: "Project Status", icon: CheckCircle2, status: project.status, type: "general", color: "emerald" },
                                { label: "Design", icon: Layers, status: project.desgin_status || 1, type: "phase", color: "blue" },
                                { label: "Deployment", icon: Rocket, status: project.deployement_status || 1, type: "phase", color: "violet" },
                                { label: "Measurement", icon: Hammer, status: project.construction_status || 1, type: "phase", color: "amber" },
                            ].map((phase) => (
                                <div key={phase.label} className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg bg-slate-50 border border-slate-100">
                                    <phase.icon size={13} className={`text-${phase.color}-500`} />
                                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">{phase.label}</span>
                                    <StatusBadge status={phase.status} type={phase.type} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metadata — compact table-style */}
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden text-[11px]">
                        <div className="flex items-center px-3 py-2 bg-white">
                            <div className="flex items-center gap-1.5 w-32 shrink-0 text-slate-500">
                                <MapPin size={11} /> <span className="font-bold uppercase text-[9px] tracking-wider">Project Location</span>
                            </div>
                            <span className="font-semibold text-slate-800">{project.project_address || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center px-3 py-2 bg-slate-50/50">
                            <div className="flex items-center gap-1.5 w-32 shrink-0 text-slate-500">
                                <Building2 size={11} /> <span className="font-bold uppercase text-[9px] tracking-wider">Project Type</span>
                            </div>
                            <span className="font-semibold text-slate-800">{project.project_created_by === 1 ? 'Department' : 'Contractor'}</span>
                        </div>
                        <div className="flex items-center px-3 py-2 bg-white">
                            <div className="flex items-center gap-1.5 w-32 shrink-0 text-slate-500">
                                <User2 size={11} /> <span className="font-bold uppercase text-[9px] tracking-wider">Project Added By</span>
                            </div>
                            <span className="font-semibold text-slate-800">{project.added_by_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center px-3 py-2 bg-slate-50/50">
                            <div className="flex items-center gap-1.5 w-32 shrink-0 text-slate-500">
                                <Calendar size={11} /> <span className="font-bold uppercase text-[9px] tracking-wider">Project Date</span>
                            </div>
                            <span className="font-semibold text-slate-800">{project.inserted_on || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 flex items-center justify-between shrink-0 border-t border-slate-100 bg-white">
                    <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-colors">
                        Close
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { onClose(); onViewProject(project.id.toString(), 'documents'); }}
                            className="px-3 py-1.5 bg-emerald-600 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest hover:bg-emerald-700 transition-all"
                        >
                            View Documents
                        </button>
                        <button
                            onClick={() => { onClose(); onViewProject(project.id.toString(), 'contractors'); }}
                            className="px-3 py-1.5 bg-indigo-600 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest hover:bg-indigo-700 transition-all"
                        >
                            View Contractor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
