import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const StatusBadge = ({ status, type = "general" }) => {
    const getConfig = () => {
        if (type === "general") {
            if (status === 1) return { text: "Inactive", icon: AlertCircle, classes: "bg-gradient-to-r from-rose-50 to-red-50 text-rose-600 border-rose-200/80 shadow-sm shadow-rose-100/50" };
            if (status === 2) return { text: "Active", icon: CheckCircle2, classes: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200/80 shadow-sm shadow-emerald-100/50" };
            if (status === 3) return { text: "Completed", icon: CheckCircle2, classes: "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 border-indigo-200/80 shadow-sm shadow-indigo-100/50" };
        }
        if (status === 1) return { text: "Pending", icon: Clock, classes: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200/80 shadow-sm shadow-amber-100/50" };
        if (status === 2) return { text: "Active", icon: CheckCircle2, classes: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 border-emerald-200/80 shadow-sm shadow-emerald-100/50" };
        if (status === 3) return { text: "Completed", icon: CheckCircle2, classes: "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-600 border-indigo-200/80 shadow-sm shadow-indigo-100/50" };
        return { text: "N/A", icon: AlertCircle, classes: "bg-slate-50 text-slate-400 border-slate-200" };
    };

    const { text, icon: Icon, classes } = getConfig();

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold border tracking-wide whitespace-nowrap ${classes}`}>
            <Icon size={10} strokeWidth={2.5} className="opacity-70" />
            {text}
        </span>
    );
};

export default StatusBadge;
