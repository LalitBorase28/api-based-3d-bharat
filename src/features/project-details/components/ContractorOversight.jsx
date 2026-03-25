import React from "react";
import { Paperclip, Users, Building2, ChevronRight, MapPin, Briefcase } from "lucide-react";

const ContractorOversight = ({ contractors, onViewEmployees }) => {

    const getAuthorityStyles = (role) => {
        const r = role?.toLowerCase();
        if (r?.includes('drone')) return 'bg-violet-50 text-violet-700 border-violet-200';
        if (r?.includes('measurement')) return 'bg-amber-50 text-amber-700 border-amber-200';
        if (r?.includes('design')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (r?.includes('manager')) return 'bg-blue-50 text-blue-700 border-blue-200';
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-800">
                            <th className="pl-4 pr-2 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest w-10">#</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Contractor</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Role</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">KM Range</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Documents</th>
                            <th className="px-3 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right pr-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {contractors && contractors.length > 0 ? (
                            contractors.map((cont, idx) => (
                                <tr key={cont.id} className="hover:bg-indigo-50/30 transition-colors group">
                                    {/* # */}
                                    <td className="pl-4 pr-2 py-3 text-[11px] font-semibold text-slate-400 tabular-nums">{String(idx + 1).padStart(2, '0')}</td>

                                    {/* Contractor Name */}
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                                <Building2 size={14} />
                                            </div>
                                            <div>
                                                <span className="block text-[12px] font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors truncate max-w-[180px]">{cont.name}</span>
                                                <span className="text-[9px] text-slate-400 font-medium">Assigned Agency</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-3 py-3 text-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${getAuthorityStyles(cont.role)}`}>
                                            <Briefcase size={9} className="opacity-60" />
                                            {cont.role}
                                        </span>
                                    </td>

                                    {/* KM Range */}
                                    <td className="px-3 py-3 text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700 tabular-nums font-mono">
                                            <MapPin size={9} className="text-indigo-400" />
                                            {cont.jurisdiction ? (String(cont.jurisdiction).toUpperCase().includes('KM') ? cont.jurisdiction : `KM ${cont.jurisdiction}`) : 'KM 0 - 0'}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-3 py-3 text-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold ${cont.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${cont.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            {cont.status}
                                        </span>
                                    </td>

                                    {/* Documents */}
                                    <td className="px-3 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {cont.documents && cont.documents.length > 0 ? (
                                                cont.documents.map(doc => (
                                                    <span key={doc.id} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[8px] font-semibold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors">
                                                        <Paperclip size={8} />
                                                        <span className="truncate max-w-[70px]">{doc.name}</span>
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[9px] text-slate-300 italic">No docs</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-3 py-3 text-right pr-4">
                                        <button
                                            onClick={() => onViewEmployees(cont)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-indigo-600 transition-all active:scale-95 shadow-sm"
                                        >
                                            <Users size={11} />
                                            Employees ({cont.employees?.length || 0})
                                            <ChevronRight size={10} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-16 text-center text-slate-400 text-[12px] italic">
                                    No oversight records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContractorOversight;
