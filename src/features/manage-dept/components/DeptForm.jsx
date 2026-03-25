import React, { useState } from "react";
import { UserCog, Phone, Mail, Building2, ClipboardCheck } from "lucide-react";
import InputField from "../../../components/common/InputField";
import SectionHeader from "../../../components/common/SectionHeader";
import FormButton from "../../../components/common/FormButton";
import FileField from "../../../components/common/FileField";

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
    manager_email: ""
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-1.5 pt-2">
        <InputField label="Short Name" name="dept_name" value={formData.dept_name} onChange={handleChange} placeholder="Short name" required isViewOnly={isViewOnly} />
        <InputField label="Full Name" name="full_dept_name" value={formData.full_dept_name} onChange={handleChange} placeholder="Full name" required isViewOnly={isViewOnly} />
        <div className="md:col-span-2">
          <InputField label="Address" name="dept_address" value={formData.dept_address} onChange={handleChange} placeholder="Address" icon={Building2} isViewOnly={isViewOnly} />
        </div>
        <FileField label="Logo" name="logo_file" value={formData.logo_file} onChange={handleFileChange} isViewOnly={isViewOnly} />
      </div>

      <div>
        <SectionHeader icon={ClipboardCheck} title="Head Details" isViewOnly={isViewOnly} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-1.5">
          <InputField label="Name" name="head_name" value={formData.head_name} onChange={handleChange} placeholder="Name" required icon={UserCog} isViewOnly={isViewOnly} />
          <InputField label="Mobile" name="head_mobile" value={formData.head_mobile} onChange={handleChange} placeholder="Mobile" required icon={Phone} isViewOnly={isViewOnly} />
          <div className="md:col-span-2">
            <InputField label="Email" name="head_email" value={formData.head_email} onChange={handleChange} placeholder="Email" required icon={Mail} isViewOnly={isViewOnly} />
          </div>
        </div>
      </div>

      <div>
        <SectionHeader icon={Building2} title="Manager Details" isViewOnly={isViewOnly} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2.5 gap-y-1.5">
          <InputField label="Name" name="manager_name" value={formData.manager_name} onChange={handleChange} placeholder="Name" required icon={UserCog} isViewOnly={isViewOnly} />
          <InputField label="Mobile" name="manager_mobile" value={formData.manager_mobile} onChange={handleChange} placeholder="Mobile" required icon={Phone} isViewOnly={isViewOnly} />
          <div className="md:col-span-2">
            <InputField label="Email" name="manager_email" value={formData.manager_email} onChange={handleChange} placeholder="Email" required icon={Mail} isViewOnly={isViewOnly} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2.5 mt-1.5 -mx-4 px-4 py-2 border-t border-slate-100 bg-slate-50/40">
        <FormButton onClick={onCancel} variant="secondary">{isViewOnly ? "Close" : "Cancel"}</FormButton>
        {!isViewOnly && <FormButton type="submit" variant="primary">{initialData ? "Update" : "Add Department"}</FormButton>}
      </div>
    </form>
  );
};

export default DeptForm;
