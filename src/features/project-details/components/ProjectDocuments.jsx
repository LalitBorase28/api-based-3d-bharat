import React from "react";
import { FileText, Download, FileSpreadsheet, FileBox, FileArchive, FolderOpen } from "lucide-react";

/**
 * ProjectDocuments component
 * Renders a list of documents in a professional cards layout.
 */
const ProjectDocuments = ({ documents = [] }) => {
    const getFileConfig = (type) => {
        const t = type?.toUpperCase();
        if (t === "PDF") return { icon: FileText, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", label: "PDF" };
        if (t === "XLS" || t === "XLSX" || t === "CSV") return { icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", label: "Excel" };
        if (t === "ZIP" || t === "RAR") return { icon: FileArchive, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", label: "Archive" };
        return { icon: FileBox, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", label: "File" };
    };

    return (
        <div className="space-y-6">
            {documents && documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {documents.map((doc) => {
                        const { icon: Icon, color, bg, border, label } = getFileConfig(doc.type);
                        return (
                            <div 
                                key={doc.id} 
                                className="group bg-white rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 flex flex-col justify-between gap-4"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Icon Box */}
                                    <div className={`w-12 h-12 rounded-xl ${bg} ${border} border-2 flex items-center justify-center ${color} shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[13px] font-bold text-slate-800 leading-tight truncate group-hover:text-indigo-700 transition-colors" title={doc.name}>
                                            {doc.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${color} ${bg} border border-current opacity-70`}>
                                                {label}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-medium">Updated 2d ago</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Repository File</span>
                                    <button 
                                        title="Download File"
                                        className="h-8 px-3 rounded-lg bg-slate-800 text-white hover:bg-indigo-600 flex items-center gap-2 transition-all shadow-sm active:scale-95"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-4">
                        <FolderOpen size={32} />
                    </div>
                    <div>
                        <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">No Documents Available</h3>
                        <p className="text-[11px] text-slate-500 mt-1.5 max-w-[240px] mx-auto leading-relaxed">
                            This project folder is currently empty. Please wait for the project manager to upload the required files.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDocuments;
