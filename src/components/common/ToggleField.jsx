import React from "react";
import { motion } from "framer-motion";

const ToggleField = ({ label, name, checked, onChange, isViewOnly }) => (
  <div className="flex items-start justify-between gap-3 px-3 py-2 bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all hover:bg-slate-50 group min-h-[44px]">
    <span className="text-label group-hover:text-indigo-700 transition-colors pt-0.5">
      {label}
    </span>
    <button
      type="button"
      disabled={isViewOnly}
      onClick={() => onChange(name, !checked)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 outline-none shrink-0 ${checked ? 'bg-indigo-600' : 'bg-slate-200'
        } ${isViewOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <motion.div
        animate={{ x: checked ? 18 : 2 }}
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);


export default ToggleField;

