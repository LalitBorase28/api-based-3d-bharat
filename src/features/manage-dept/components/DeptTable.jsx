import React from "react";
import {
  Building2,
  Eye,
  Pencil,
  Power,
  Trash2
} from "lucide-react";

/**
 * Enterprise-grade Responsive Data Table for Department Management.
 * Optimized for 'Compact' view on Desktop and 'Smooth Scroll' on Mobile.
 */

const DeptTable = ({ departments, onViewClick }) => {
  return (
    <div className="w-full bg-indigo-200 overflow-x-auto custom-scrollbar border border-slate-100 rounded-2xl shadow-sm">
      <table className="w-full border-collapse min-w-[1000px] xl:min-w-full">
        <thead>
          <tr className="bg-slate-900 border-b border-slate-700">
            <th className="py-3 px-3 w-10 text-center rounded-tl-2xl border-r border-slate-300/50">
              <input type="checkbox" className="w-3.5 h-3.5 rounded-md accent-indigo-600 cursor-pointer" />
            </th>
            <th className="py-3 px-2 text-table-head text-center w-16 border-r border-slate-300/50">Logo</th>
            <th className="py-3 px-3 text-table-head text-left min-w-[140px] border-r border-slate-300/50">Organization</th>
            <th className="py-3 px-3 text-table-head text-left min-w-[150px] border-r border-slate-300/50">Department Head</th>
            <th className="py-3 px-3 text-table-head text-left min-w-[150px] border-r border-slate-300/50">Operation Manager</th>
            <th className="py-3 px-2 text-table-head text-center w-28 border-r border-slate-300/50">Created At</th>
            <th className="py-3 px-2 text-table-head text-center w-24 border-r border-slate-300/50">Status</th>
            <th className="py-3 px-3 text-table-head text-center rounded-tr-2xl w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {departments.map((dept) => (
            <tr key={dept.id} className="group hover:bg-slate-50/50 transition-all duration-300">
              <td className="py-2.5 px-3 text-center border-r border-slate-100">
                <input type="checkbox" className="w-3.5 h-3.5 rounded-md accent-indigo-600 cursor-pointer" />
              </td>

              <td className="py-2.5 px-2 text-center border-r border-slate-100">
                <div className="inline-block">
                  <div className="w-10 h-10 bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center overflow-hidden">
                    {dept.logo ? (
                      <img src={dept.logo} alt={dept.shortName} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <Building2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </td>

              <td className="py-2.5 px-3 border-r border-slate-100">
                <div className="flex flex-col gap-0">
                  <h3 className="text-table-main uppercase truncate max-w-[130px]">
                    {dept.shortName}
                  </h3>
                  <p className="text-table-sub capitalize truncate max-w-[140px]">
                    {dept.fullName}
                  </p>
                </div>
              </td>

              <td className="py-2.5 px-3 border-r border-slate-100">
                <div className="flex flex-col">
                  <span className="text-table-main truncate max-w-[140px]">
                    {dept.head?.name || "N/A"}
                  </span>
                  <span className="text-table-sub italic truncate max-w-[140px]">
                    {dept.head?.email || ""}
                  </span>
                </div>
              </td>

              <td className="py-2.5 px-3 border-r border-slate-100">
                <div className="flex flex-col">
                  <span className="text-table-main truncate max-w-[140px]">
                    {dept.manager?.name || "N/A"}
                  </span>
                  <span className="text-table-sub italic truncate max-w-[140px]">
                    {dept.manager?.email || ""}
                  </span>
                </div>
              </td>

              <td className="py-2.5 px-2 text-center whitespace-nowrap border-r border-slate-100">
                <span className="text-table-main !text-slate-600">
                  {dept.createdAt}
                </span>
              </td>

              <td className="py-2.5 px-2 text-center border-r border-slate-100">
                <div className="flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label border shadow-sm ${dept.status === 1
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    <div className={`w-1 h-1 rounded-full ${dept.status === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {dept.status === 1 ? "Active" : "Pending"}
                  </span>
                </div>
              </td>

              <td className="py-2.5 px-3">
                <div className="flex justify-center">
                  <div className="inline-flex items-center bg-[#fffbf5] px-3 py-1.5 rounded-xl border border-[#fee9c5] shadow-sm gap-4 transition-all duration-300 hover:shadow-md hover:border-orange-200">
                    <button
                      onClick={() => onViewClick(dept)}
                      className="text-orange-500/80 hover:text-orange-600 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-blue-500/80 hover:text-blue-600 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-emerald-500/80 hover:text-emerald-600 transition-colors">
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-red-400/80 hover:text-red-500 transition-colors border-l border-orange-100 pl-3.5 ml-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeptTable;
