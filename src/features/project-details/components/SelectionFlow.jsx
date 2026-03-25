import React from "react";
import { Building2, UserCog, ChevronRight } from "lucide-react";

const SelectionFlow = ({
    selectionType,
    selectedEntityId,
    onTypeChange,
    onEntityChange,
    contractors,
    departments
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Step 1 */}
                <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-5 h-5 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center text-[10px]">1</span>
                        Select Category
                    </label>
                    <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200">
                        <button
                            onClick={() => onTypeChange("dept")}
                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[13px] font-bold ${selectionType === "dept" ? 'bg-blue-200 text-indigo-900 shadow-sm border border-slate-100' : 'text-slate-800 hover:text-slate-900'}`}
                        >
                            <Building2 size={16} />
                            Department
                        </button>
                        <button
                            onClick={() => onTypeChange("cont")}
                            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[13px] font-bold ${selectionType === "cont" ? 'bg-violet-200 text-violet-900 shadow-sm border border-slate-100' : 'text-slate-800 hover:text-slate-900'}`}
                        >
                            <UserCog size={16} />
                            Contractor
                        </button>
                    </div>
                </div>

                {/* Step 2 */}
                <div className={`space-y-2.5 ${selectionType ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-30 pointer-events-none'}`}>
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px]">2</span>
                        {selectionType === "cont" ? "Choose Contractor" : "Choose Department"}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedEntityId}
                            onChange={(e) => onEntityChange(e.target.value)}
                            className="w-full bg-slate-50 border-none text-slate-800 text-[13px] rounded-xl focus:ring-0 focus:outline-none block p-2.5 pr-10 appearance-none cursor-pointer hover:bg-slate-100/80 font-bold shadow-sm"
                        >
                            <option value="">{selectionType === "cont" ? "Select Contractor..." : "Select Department..."}</option>
                            {(selectionType === "cont" ? contractors : departments).map(entity => (
                                <option key={entity.id} value={entity.id}>{entity.name || entity.dept_full_name || entity.cont_name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                            <ChevronRight size={16} className="rotate-90" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectionFlow;
