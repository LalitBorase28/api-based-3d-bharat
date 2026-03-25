export const formatKMCH = (km, ch) => {
    const kmPart = Math.floor(km || 0);
    const chPart = String(ch || 0).padStart(3, '0');
    return `${kmPart}+${chPart}`;
};

export const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}`;
};

export const thClass = "px-3 py-3 text-[9px] font-semibold uppercase tracking-widest text-slate-300 border-r border-slate-700/40 last:border-r-0";
