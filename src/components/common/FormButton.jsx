import React from "react";

const FormButton = ({ onClick, type = "button", variant = "primary", children, className = "", isLoading = false }) => {
  const variants = {
    primary: "bg-[#1e293b] hover:bg-indigo-600 text-white shadow-sm border border-slate-700 hover:border-indigo-500 disabled:bg-slate-400 disabled:border-slate-300",
    secondary: "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-sm border border-rose-400 disabled:opacity-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`px-5 py-1.5 rounded-md text-button transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >

      {isLoading ? (
        <>
          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : children}
    </button>
  );
};

export default FormButton;
