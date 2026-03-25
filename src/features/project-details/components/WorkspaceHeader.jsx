import React from "react";
import { ChevronRight, MapPin, UserCog, FileText } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatKMCH } from "../utils/helpers";

const WorkspaceHeader = ({ project, onBack, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'contractors', label: 'Contractor Oversight', icon: UserCog },
        { id: 'documents', label: 'Project Documents', icon: FileText }
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 flex flex-col sticky top-0 z-30 overflow-hidden mb-5">
            {/* Compact Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onBack}
                        className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors shrink-0"
                    >
                        <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <div className="min-w-0 flex items-center gap-3 flex-wrap">
                        <h1 className="text-[14px] font-semibold text-slate-800 leading-none truncate">{project.name}</h1>
                        <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[9px] font-semibold uppercase tracking-wide leading-none shrink-0">{project.project_id}</span>
                    </div>
                    <div className="hidden lg:block w-px h-5 bg-slate-200 mx-1 shrink-0"></div>
                    <p className="hidden lg:block text-[10px] text-slate-600 italic truncate max-w-xs">"{project.project_description}"</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                        <MapPin size={11} className="text-indigo-500 shrink-0" />
                        <span className="text-[10px] font-semibold text-slate-800 tabular-nums whitespace-nowrap">
                            {formatKMCH(project.from_km, project.from_chainage)} — {formatKMCH(project.to_km, project.to_chainage)}
                        </span>
                    </div>
                    <StatusBadge status={project.status} type="general" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center px-4 bg-white">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-colors relative ${
                                isActive
                                ? 'text-indigo-600'
                                : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            <Icon size={13} className={isActive ? 'text-indigo-600' : 'text-slate-600'} />
                            {tab.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkspaceHeader;
