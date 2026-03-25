import React from "react";

const SectionHeader = ({ icon: Icon, title, isViewOnly }) => (
  <div className="flex items-center gap-1.5 py-1 mt-1.5 mb-1.5 border-b border-slate-100">
    <div className={`p-0.5 rounded ${isViewOnly ? 'bg-blue-500' : 'bg-[#1e293b]'}`}>
      <Icon size={10} strokeWidth={2.5} className="text-white" />
    </div>
    <h3 className="text-[9px] font-semibold text-slate-800 uppercase">{title}</h3>
  </div>
);

export default SectionHeader;
