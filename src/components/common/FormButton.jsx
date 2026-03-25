import React from "react";

const FormButton = ({ onClick, type = "button", variant = "primary", children, className = "" }) => {
  const variants = {
    primary: "bg-[#1e293b] hover:bg-indigo-600 text-white shadow-sm border border-slate-700 hover:border-indigo-500",
    secondary: "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-sm border border-rose-400"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-1.5 rounded-md text-[9px] font-bold tracking-wide transition-all duration-200 active:scale-[0.97] ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
