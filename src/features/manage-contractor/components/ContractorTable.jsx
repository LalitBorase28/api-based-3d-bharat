import React from "react";
import { Eye, Edit3, User, Mail, Power, Trash2, ShieldCheck, Briefcase } from "lucide-react";
import tempLogo from "../../../assets/images/temp_logo.png";

const ContractorTable = ({ data, searchQuery, onEdit, onView, onToggleStatus, onDelete, selectedId, onSelect }) => {
  const filteredData = data.filter((item) => {
    const searchStr = searchQuery.toLowerCase();
    const name = item.cont_name || "";
    const shortName = item.cont_short_name || "";
    const id = item.cont_id || "";

    return (
      name.toLowerCase().includes(searchStr) ||
      shortName.toLowerCase().includes(searchStr) ||
      id.toLowerCase().includes(searchStr)
    );
  });

  const vBorder = "border-r border-slate-200/70";

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="bg-slate-900 border-b border-slate-200">
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 w-14 border-r border-slate-200/60 text-center">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 bg-white" disabled />
              </th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 border-r border-slate-200/60 text-center">Logo</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 border-r border-slate-200/60">Contractor</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 border-r border-slate-200/60">Contractor Head</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 border-r border-slate-200/60">Project Manager</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 border-r border-slate-200/60 text-center">Created At</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 text-center border-r border-slate-200/60">Status</th>
              <th className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-100 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map((item, index) => (
              <tr key={item.id} className={`group border-b border-slate-200 hover:bg-slate-50/50 transition-colors duration-200 ${selectedId === item.id ? 'bg-emerald-50/30' : ''}`}>
                <td className={`px-5 py-4 ${vBorder} text-center`}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer shadow-sm"
                    checked={selectedId === item.id}
                    onChange={() => onSelect(item.id)}
                  />
                </td>
                <td className={`px-5 py-4 ${vBorder}`}>
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shadow-sm group-hover:border-emerald-200 group-hover:shadow-emerald-100/40 transition-all duration-400 overflow-hidden shrink-0">
                      <img src={item.logo || tempLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </td>
                <td className={`px-5 py-4 ${vBorder}`}>
                  <div className="min-w-0">
                    <div className={`font-semibold text-[13px] tracking-tight group-hover:text-emerald-700 transition-colors truncate ${selectedId === item.id ? 'text-emerald-700' : 'text-slate-700'}`}>{item.cont_short_name}</div>
                    <div className="text-[9.5px] text-slate-700 font-semibold uppercase tracking-wider mt-0.5 truncate max-w-[150px]">{item.cont_name}</div>
                  </div>
                </td>
                <td className={`px-5 py-4 ${vBorder}`}>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-slate-700 tracking-tight truncate">{item.head_name || "—"}</div>
                    <div className="text-[9.5px] text-slate-500 font-semibold mt-0.5 truncate lowercase">{(item.head_email || "—").toLowerCase()}</div>
                  </div>
                </td>
                <td className={`px-5 py-4 ${vBorder}`}>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-slate-700 tracking-tight truncate">{item.manager_name || "—"}</div>
                    <div className="text-[9.5px] text-slate-500 font-medium mt-0.5 truncate lowercase">{(item.manager_email || "—").toLowerCase()}</div>
                  </div>
                </td>
                <td className={`px-5 py-4 ${vBorder} text-center`}>
                  <span className="text-[12px] font-medium text-slate-600">
                    {item.created_at || "—"}
                  </span>
                </td>
                <td className={`px-5 py-4 ${vBorder}`}>
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8.5px] font-semibold tracking-wider ${item.status === 2 ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-100'}`}>
                      <div className={`w-1 h-1 rounded-full ${item.status === 2 ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                      {item.status === 2 ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-0.5 bg-orange-50/70 p-1 rounded-xl border border-orange-200/50 group-hover:bg-white group-hover:shadow-md group-hover:shadow-slate-200/30 group-hover:border-slate-200 transition-all duration-300">
                      <button onClick={() => onView(item)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"><Eye className="text-orange-500" size={14} /></button>
                      <button onClick={() => onEdit(item)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"><Edit3 className="text-blue-500" size={14} /></button>
                      <button onClick={() => onToggleStatus(item.id)} className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 ${item.status === 2 ? 'text-emerald-500 hover:bg-emerald-50' : 'text-rose-400 hover:bg-rose-50'}`}><Power size={14} /></button>
                      <div className="w-px h-3.5 bg-slate-200 mx-0.5" />
                      <button onClick={() => onDelete?.(item.id)} className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="px-8 py-20 text-center bg-white border-t border-slate-200">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl flex items-center justify-center text-indigo-200 border border-indigo-100/50"><ShieldCheck size={32} /></div>
                    <div>
                      <div className="text-[14px] font-bold text-slate-500 tracking-tight">No records found</div>
                      <p className="text-[11px] text-slate-400 mt-1">Try adjusting your search or filters.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border-t border-slate-200 px-8 py-3 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 font-medium">Showing <span className="font-bold text-slate-600">{filteredData.length}</span> of <span className="font-bold text-slate-600">{data.length}</span> entries</p>
      </div>
    </div>
  );
};

export default ContractorTable;
