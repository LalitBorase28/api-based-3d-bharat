import React from "react";

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-2 mt-4 first:mt-0">
    <div className="p-1 bg-slate-100 rounded text-slate-700">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <h3 className="text-label text-slate-500">
      {title}
    </h3>
  </div>
);


export default SectionHeader;

