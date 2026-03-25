import React from "react";
import { Plus } from "lucide-react";

const AddButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="bg-[#1e293b] hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-md shadow-slate-300/20 hover:shadow-indigo-200/40 flex items-center gap-1.5 transition-all duration-300 active:scale-[0.97] border border-slate-700 hover:border-indigo-500 whitespace-nowrap shrink-0"
  >
    <Plus size={14} strokeWidth={2.5} />
    <span className="hidden xs:inline">Add</span> {label}
  </button>
);

export default AddButton;
