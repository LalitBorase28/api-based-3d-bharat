import React from "react";
import {
  X,
  LayoutGrid,
  Building2,
  User,
  Phone,
  Mail,
  Shield,
  MapPin,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeptView = ({ isOpen, onClose, department }) => {
  if (!isOpen || !department) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="bg-white rounded-[20px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-slate-100"
        >
          {/* Header Section */}
          <div className="bg-[#020617] p-4 px-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-600/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">
                  Infrastructure Management
                </h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">View Department Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-6 -translate-y-1/2">
              <div className="w-16 h-16 bg-white rounded-xl shadow-xl p-1.5 border-4 border-white flex items-center justify-center overflow-hidden">
                {department.logo ? (
                  <img src={department.logo} alt={department.shortName} className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-8 h-8 text-slate-200" />
                )}
              </div>
            </div>
          </div>

          <div className="pt-10 px-6 pb-6 flex flex-col gap-5">
            {/* Title & Status */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                  {department.fullName}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-500 font-bold text-[10px] px-1.5 py-0.5 bg-slate-50 rounded border border-slate-100 uppercase tracking-widest">
                    {department.shortName}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 italic">
                    <Calendar className="w-3 h-3" />
                    {department.createdAt}
                  </span>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${department.status === 1
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                <div className={`w-1 h-1 rounded-full ${department.status === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {department.status === 1 ? "Active" : "Pending"}
              </span>
            </div>

            {/* Address */}
            {department.address && (
              <div className="flex items-start gap-2 p-2 bg-slate-50/80 rounded-xl border border-slate-100">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 mt-0.5" />
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed italic">
                  {department.address}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Head Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Department Head</h3>
                </div>
                <div className="space-y-2.5">
                  <DetailItem icon={User} label="Name" value={department.head?.name || "N/A"} />
                  <DetailItem icon={Phone} label="Mobile" value={department.head?.mobile || "N/A"} />
                  <DetailItem icon={Mail} label="Email" value={department.head?.email || "N/A"} />
                </div>
              </div>

              {/* Manager Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Op. Manager</h3>
                </div>
                <div className="space-y-2.5">
                  <DetailItem icon={User} label="Name" value={department.manager?.name || "N/A"} />
                  <DetailItem icon={Phone} label="Mobile" value={department.manager?.mobile || "N/A"} />
                  <DetailItem icon={Mail} label="Email" value={department.manager?.email || "N/A"} />
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Assigned Modules</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {department.modules ? (
                  <>
                    {department.modules.inspection && <ModuleBadge label="Inspection" />}
                    {department.modules.workProgress1 && <ModuleBadge label="WP (Type 1)" />}
                    {department.modules.workProgress2 && <ModuleBadge label="WP (Drone)" />}
                  </>
                ) : (
                  <span className="text-slate-400 text-[10px] italic">No modules assigned</span>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl shadow-indigo-100 transition-all active:scale-95 border border-indigo-500/50"
            >
              Close View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col">
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-1.5 mt-0.5">
      <div className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center">
        <Icon className="w-3 h-3 text-slate-400" />
      </div>
      <span className="text-[13px] font-semibold text-slate-700 truncate">{value}</span>
    </div>
  </div>
);

const ModuleBadge = ({ label }) => (
  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{label}</span>
  </div>
);

export default DeptView;
