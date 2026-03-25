import React, { useState, useMemo } from "react";
import { ChevronRight, Users, CheckCircle2, Clock, Phone, Mail, User, Search, MapPin, ShieldCheck, Briefcase } from "lucide-react";

/**
 * EmployeeList component
 * Renders a list of personnel in a professional tabular format with a clear distinction for Leadership.
 */
const EmployeeList = ({ contractor, onBack, employeesPerPage = 10 }) => {
    const [employeePage, setEmployeePage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const allEmployees = useMemo(() => {
        if (!contractor?.employees) return [];
        return contractor.employees;
    }, [contractor]);

    const leadership = useMemo(() => {
        return allEmployees.filter(emp =>
            emp.designation_name === "Contractor Head" ||
            emp.designation_name === "Operation Manager"
        );
    }, [allEmployees]);

    const generalStaff = useMemo(() => {
        const staff = allEmployees.filter(emp =>
            emp.designation_name !== "Contractor Head" &&
            emp.designation_name !== "Operation Manager"
        );

        if (!searchQuery) return staff;

        return staff.filter(emp =>
            emp.emp_full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.designation_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allEmployees, searchQuery]);

    const paginatedStaff = useMemo(() => {
        const startIndex = (employeePage - 1) * employeesPerPage;
        return generalStaff.slice(startIndex, startIndex + employeesPerPage);
    }, [generalStaff, employeePage, employeesPerPage]);

    const totalStaffPages = Math.ceil(generalStaff.length / employeesPerPage);

    const getInitials = (name) => {
        if (!name) return "??";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getAuthorityStyles = () => {
        return 'text-slate-800 border border-slate-200 rounded-sm px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-widest shadow-sm shadow-slate-200/50';
    };

    const renderEmployeeRow = (emp, idx, isLeadership = false) => {
        // For leadership, we only show the main authority (contractor's role)
        const displayAuthorities = isLeadership
            ? [contractor.role]
            : (emp.authorities || []);

        return (
            <tr key={emp.id} className={`border-b border-slate-200 last:border-b-0 hover:bg-indigo-50/40 transition-colors group ${isLeadership ? 'bg-indigo-50/30' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50')}`}>
                <td className="px-5 py-4 text-[11px] font-bold text-slate-500 tabular-nums border-r border-slate-200">
                    {isLeadership ? <ShieldCheck size={14} className="text-indigo-600" /> : String(idx + 1).padStart(2, '0')}
                </td>
                <td className="px-5 py-4 border-r border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center text-[12px] font-black shrink-0 transition-all shadow-sm ${isLeadership ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-500 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600'
                            }`}>
                            {getInitials(emp.emp_full_name)}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-[12px] font-bold leading-tight transition-colors ${isLeadership ? 'text-indigo-900 group-hover:text-indigo-700' : 'text-slate-800 group-hover:text-indigo-700'}`}>
                                {emp.emp_full_name}
                            </span>
                            <span className="text-[9px] text-slate-500 font-medium mt-0.5 tracking-tight uppercase tabular-nums">{emp.eha_id}</span>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-4 text-center border-r border-slate-200 min-w-[140px]">
                    <span className={`inline-flex px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider shadow-sm border ${isLeadership ? 'bg-indigo-900 text-white border-indigo-950 px-3' : 'bg-white text-indigo-700 border-indigo-100'
                        }`}>
                        {emp.designation_name}
                    </span>
                </td>
                <td className="px-5 py-4 border-r border-slate-200 min-w-[200px]">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                            <Phone size={10} className="text-slate-400" />
                            {emp.emp_mob_no}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                            <Mail size={10} className="text-slate-400" />
                            {emp.emp_email}
                        </div>
                    </div>
                </td>
                <td className="px-5 py-4 text-left border-r border-slate-200 min-w-[140px]">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                        {displayAuthorities.map((auth, ai) => (
                            <span key={ai} className={`inline-flex items-center ${getAuthorityStyles()}`}>
                                {auth}
                            </span>
                        ))}
                    </div>
                </td>
                <td className="px-5 py-4 text-center border-r border-slate-200 min-w-[120px]">
                    <div className="flex items-center justify-center gap-2 group/km">
                        <div className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-100 group-hover/km:bg-indigo-600 group-hover/km:text-white transition-colors">
                            <MapPin size={10} />
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 tabular-nums leading-tight group-hover:text-indigo-700 transition-colors">
                            KM {emp.jurisdiction?.from_km} - {emp.jurisdiction?.to_km}
                        </span>
                    </div>
                </td>
                <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold ${emp.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        {emp.status}
                    </span>
                </td>
            </tr>
        );
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-slate-400 flex items-center justify-center text-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all active:scale-95 group shadow-sm shadow-slate-200/50"
                    >
                        <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div>
                        <h3 className="text-[14px] font-black text-slate-800 tracking-tight leading-none uppercase">{contractor.name} PERSONNEL</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                            <Users size={12} className="text-indigo-500" />
                            {allEmployees.length} Total Records
                        </p>
                    </div>
                </div>

                <div className="relative group w-full md:w-72">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search general staff..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setEmployeePage(1); }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-[11px] font-bold text-slate-800 uppercase tracking-widest placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Personnel Tables */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800">
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider w-14 border-r border-slate-700">#</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-700">Personnel</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider text-center border-r border-slate-700">Designation</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-700">Contact Details</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider text-center border-r border-slate-700">Authority</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider text-center border-r border-slate-700">KM Range</th>
                                <th className="px-5 py-3.5 text-[10px] font-semibold text-slate-300 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>

                        {/* Leadership Section */}
                        {leadership.length > 0 && (
                            <tbody>
                                <tr className="bg-slate-50/80">
                                    <td colSpan="7" className="px-5 py-2.5 border-b border-slate-200 text-center">
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-indigo-700 uppercase tracking-widest">
                                            <ShieldCheck size={12} strokeWidth={3} />
                                            Agency Leadership
                                        </div>
                                    </td>
                                </tr>
                                {leadership.map((emp, idx) => renderEmployeeRow(emp, idx, true))}
                            </tbody>
                        )}

                        {/* General Staff Section */}
                        <tbody>
                            <tr className="bg-slate-50/80">
                                <td colSpan="7" className="px-5 py-2.5 border-b border-slate-200 text-center">
                                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                        <Briefcase size={12} strokeWidth={3} />
                                        Operational Staff
                                    </div>
                                </td>
                            </tr>
                            {paginatedStaff.length > 0 ? (
                                paginatedStaff.map((emp, idx) => renderEmployeeRow(emp, idx, false))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                                                <User size={32} />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">No Staff Found</h3>
                                                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                                                    We couldn't find any employees matching your search in the operational staff section.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {totalStaffPages > 1 && (
                    <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Staff Records {((employeePage - 1) * employeesPerPage) + 1} TO {Math.min(employeePage * employeesPerPage, generalStaff.length)} OF {generalStaff.length}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                disabled={employeePage === 1}
                                onClick={() => setEmployeePage(p => Math.max(1, p - 1))}
                                className="px-3 py-1.5 bg-slate-50 border-2 border-slate-300 rounded-lg text-[10px] font-semibold uppercase text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Prev
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalStaffPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setEmployeePage(page)}
                                        className={`w-8 h-8 rounded-lg border-2 text-[10px] font-semibold transition-all shadow-sm ${employeePage === page ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-300 hover:border-slate-800 hover:text-slate-800 text-slate-700'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={employeePage === totalStaffPages}
                                onClick={() => setEmployeePage(p => Math.min(totalStaffPages, p + 1))}
                                className="px-3 py-1.5 bg-slate-50 border-2 border-slate-300 rounded-lg text-[10px] font-semibold uppercase text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
