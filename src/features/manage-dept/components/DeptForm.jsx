import React, { useState } from "react";
import {
  X,
  LayoutGrid,
  Home,
  User,
  Phone,
  Mail,
  Shield,
  CircleCheck
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../../../components/common/SectionHeader.jsx";
import InputField from "../../../components/common/InputField.jsx";
import ToggleField from "../../../components/common/ToggleField.jsx";
import FileField from "../../../components/common/FileField.jsx";
import { toast } from "react-toastify";
import api from "../../../services/api";

const DeptForm = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shortName: "",
    fullName: "",
    address: "",
    logo: null,
    head: { name: "", mobile: "", email: "" },
    manager: { name: "", mobile: "", email: "" },
    modules: {
      inspection: true,
      workProgress1: false,
      workProgress2: false,
    }
  });

  if (!isOpen) return null;

  const handleModuleToggle = (name, value) => {
    setFormData(prev => {
      const newModules = { ...prev.modules };
      if (name === 'workProgress1') {
        newModules.workProgress1 = value;
        if (value) newModules.workProgress2 = false;
      } else if (name === 'workProgress2') {
        newModules.workProgress2 = value;
        if (value) newModules.workProgress1 = false;
      } else {
        newModules[name] = value;
      }
      return { ...prev, modules: newModules };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (role, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [role]: { ...prev[role], [name]: value }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        dept_full_name: formData.fullName,
        dept_short_name: formData.shortName,
        dept_logo: formData.logo || "", // If file upload is not supported via JSON, this might need adjustment
        status: 2,
        required_modules: formData.modules.workProgress2 ? 3 : (formData.modules.workProgress1 ? 2 : 1),
        created_by: 1,
        created_by_id: 1101,
        dept_head_name: formData.head.name,
        dept_head_mobile: formData.head.mobile,
        dept_head_email: formData.head.email,
        operational_manager_name: formData.manager.name,
        operational_manager_mobile: formData.manager.mobile,
        operational_manager_email: formData.manager.email
      };

      // Execute API call with JSON payload
      await api.post('/data/create-department', payload);

      toast.success("Department created successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create department. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white sm:rounded-[24px] shadow-2xl w-full h-full sm:h-auto max-w-4xl max-h-[100vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-h2 text-white">Add New Department</h2>
              <p className="text-caption text-slate-400">Please fill in the department details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar">
          <div className="space-y-8 sm:space-y-10">
            {/* Identity Section */}
            <section className="space-y-4">
              <SectionHeader icon={Shield} title="Department Identity" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  label="Department Short Name"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  placeholder="Ex: PWD-MH"
                  icon={User}
                  required
                />
                <InputField
                  label="Department Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ex: Public Works Department"
                  icon={User}
                  required
                />
              </div>
              <InputField
                label="Department Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full department address"
                icon={Home}
              />
              <FileField
                label="Department Logo"
                name="logo"
                value={formData.logo}
                onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
              />
            </section>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              {/* Head Details */}
              <section className="space-y-4">
                <SectionHeader icon={CircleCheck} title="Department Head" />
                <div className="space-y-4">
                  <InputField
                    label="Name"
                    name="name"
                    value={formData.head.name}
                    onChange={(e) => handleNestedChange('head', e)}
                    placeholder="Head Name"
                    icon={User}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Mobile"
                      name="mobile"
                      value={formData.head.mobile}
                      onChange={(e) => handleNestedChange('head', e)}
                      placeholder="Mobile No."
                      icon={Phone}
                      required
                    />
                    <InputField
                      label="Email"
                      name="email"
                      value={formData.head.email}
                      onChange={(e) => handleNestedChange('head', e)}
                      placeholder="Email Address"
                      icon={Mail}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Manager Details */}
              <section className="space-y-4">
                <SectionHeader icon={CircleCheck} title="Operational Manager" />
                <div className="space-y-4">
                  <InputField
                    label="Name"
                    name="name"
                    value={formData.manager.name}
                    onChange={(e) => handleNestedChange('manager', e)}
                    placeholder="Manager Name"
                    icon={User}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Mobile"
                      name="mobile"
                      value={formData.manager.mobile}
                      onChange={(e) => handleNestedChange('manager', e)}
                      placeholder="Mobile No."
                      icon={Phone}
                      required
                    />
                    <InputField
                      label="Email"
                      name="email"
                      value={formData.manager.email}
                      onChange={(e) => handleNestedChange('manager', e)}
                      placeholder="Email Address"
                      icon={Mail}
                      required
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Modules Section */}
            <section className="space-y-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <SectionHeader icon={Shield} title="Access Modules" />
                <span className="text-label text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full self-start">
                  Select requirement level
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 sm:p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                <ToggleField
                  label="1-Inspection"
                  name="inspection"
                  checked={formData.modules.inspection}
                  onChange={handleModuleToggle}
                />
                <ToggleField
                  label="2-Work Progress (v1)"
                  name="workProgress1"
                  checked={formData.modules.workProgress1}
                  onChange={handleModuleToggle}
                />
                <ToggleField
                  label="3-Work Progress (v2)"
                  name="workProgress2"
                  checked={formData.modules.workProgress2}
                  onChange={handleModuleToggle}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-white shrink-0">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 border border-slate-200 text-slate-600 text-button rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white text-button rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              "Create Department"
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default DeptForm;

