import React, { useState } from "react";
import { UserCog, Phone, Mail, Building2, ClipboardCheck } from "lucide-react";
import InputField from "../../../components/common/InputField";
import SectionHeader from "../../../components/common/SectionHeader";
import FormButton from "../../../components/common/FormButton";
import FileField from "../../../components/common/FileField";
import ToggleField from "../../../components/common/ToggleField";
import { Shield } from "lucide-react";

const DeptForm = ({ initialData, isViewOnly, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    dept_name: "",
    full_dept_name: "",
    dept_address: "",
    logo_file: null,
    head_name: "",
    head_mobile: "",
    head_email: "",
    manager_name: "",
    manager_mobile: "",
    manager_email: "",
    modules: ["inspection"]
  });

  const handleModuleToggle = (moduleName, isChecked) => {
    if (isViewOnly) return;
    setFormData(prev => {
      const currentModules = prev.modules || [];
      if (isChecked) {
        let newModules = [...currentModules, moduleName];
        if (moduleName === "work_progress") {
          newModules = newModules.filter(m => m !== "drone_target");
        } else if (moduleName === "drone_target") {
          newModules = newModules.filter(m => m !== "work_progress");
        }
        return { ...prev, modules: Array.from(new Set(newModules)) };
      } else {
        if (currentModules.length <= 1) return prev;
        return { ...prev, modules: currentModules.filter(m => m !== moduleName) };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name, file) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-3 space-y-1">
      <SectionHeader icon={Building2} title="Department Identity" isViewOnly={isViewOnly} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-1.5 pt-1">
        <InputField label="Department Short Name" name="dept_name" value={formData.dept_name} onChange={handleChange} placeholder="Short name" required isViewOnly={isViewOnly} />
        <InputField label="Department Full Name" name="full_dept_name" value={formData.full_dept_name} onChange={handleChange} placeholder="Full name" required isViewOnly={isViewOnly} />
        <div className="md:col-span-2">
          <InputField label="Department Address" name="dept_address" value={formData.dept_address} onChange={handleChange} placeholder="Address" icon={Building2} isViewOnly={isViewOnly} />
        </div>
        <FileField label="Department Logo" name="logo_file" value={formData.logo_file} onChange={handleFileChange} isViewOnly={isViewOnly} />
      </div>

      <div>
        <SectionHeader icon={ClipboardCheck} title="Department Head Details" isViewOnly={isViewOnly} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2.5 gap-y-1.5">
          <InputField label="Name" name="head_name" value={formData.head_name} onChange={handleChange} placeholder="Name" required icon={UserCog} isViewOnly={isViewOnly} />
          <InputField label="Mobile" name="head_mobile" value={formData.head_mobile} onChange={handleChange} placeholder="Mobile" required icon={Phone} isViewOnly={isViewOnly} />
          <InputField label="Email" name="head_email" value={formData.head_email} onChange={handleChange} placeholder="Email" required icon={Mail} isViewOnly={isViewOnly} />
        </div>
      </div>

      <div className="mt-1">
        <SectionHeader icon={Building2} title="Department Operational Manager Details" isViewOnly={isViewOnly} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2.5 gap-y-1.5">
          <InputField label="Name" name="manager_name" value={formData.manager_name} onChange={handleChange} placeholder="Name" required icon={UserCog} isViewOnly={isViewOnly} />
          <InputField label="Mobile" name="manager_mobile" value={formData.manager_mobile} onChange={handleChange} placeholder="Mobile" required icon={Phone} isViewOnly={isViewOnly} />
          <InputField label="Email" name="manager_email" value={formData.manager_email} onChange={handleChange} placeholder="Email" required icon={Mail} isViewOnly={isViewOnly} />
        </div>
      </div>

      <div className="pt-1">
        <div className="relative p-2 rounded-xl bg-slate-50/30 border border-slate-200/60 shadow-sm overflow-hidden group/frame">
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100/80">
            <div className="flex items-center gap-1.5">
              <div className="p-0.5 rounded bg-indigo-600 text-white">
                <Shield size={10} strokeWidth={2.5} />
              </div>
              <h3 className="text-[8px] font-black text-slate-700 uppercase tracking-wider">Modules</h3>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-1.5 py-0.5 rounded-full border border-indigo-50/50">
              <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[8px] font-bold text-indigo-900 uppercase tracking-tighter">
                1 Independent | Select Only one from 2 & 3
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10">
            <ToggleField
              label="1-Inspection"
              checked={formData.modules?.includes("inspection")}
              onChange={() => handleModuleToggle("inspection", !formData.modules?.includes("inspection"))}
              isViewOnly={isViewOnly}
            />

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <ToggleField
                label="2-Work Progress + Design + Measurement"
                checked={formData.modules?.includes("work_progress")}
                onChange={() => handleModuleToggle("work_progress", !formData.modules?.includes("work_progress"))}
                isViewOnly={isViewOnly}
              />
              <ToggleField
                label="3-Work Progress + Design + Measurement + Drone Target"
                checked={formData.modules?.includes("drone_target")}
                onChange={() => handleModuleToggle("drone_target", !formData.modules?.includes("drone_target"))}
                isViewOnly={isViewOnly}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2.5 mt-1.5 -mx-4 px-4 py-2 bg-slate-50/40">
        <FormButton onClick={onCancel} variant="secondary">{isViewOnly ? "Close" : "Cancel"}</FormButton>
        {!isViewOnly && <FormButton type="submit" variant="primary">{initialData ? "Update" : "Add Department"}</FormButton>}
      </div>
    </form>
  );
};

export default DeptForm;
