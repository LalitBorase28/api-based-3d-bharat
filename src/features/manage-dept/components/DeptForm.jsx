import React, { useState, useEffect } from "react";

import {
  X,
  LayoutGrid,
  Home,
  User,
  Phone,
  Mail,
  Shield,
  CircleCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../../../components/common/SectionHeader.jsx";
import InputField from "../../../components/common/InputField.jsx";
import ToggleField from "../../../components/common/ToggleField.jsx";
import FileField from "../../../components/common/FileField.jsx";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  mobileSchema,
  emailSchema,
  nameSchema,
  shortNameSchema
} from "../../../utils/validation";

const DeptForm = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    shortName: shortNameSchema,
    fullName: Yup.string()
      .min(5, "Full name too short")
      .required("Required"),
    address: Yup.string().optional(),
    head: Yup.object().shape({
      name: nameSchema,
      mobile: mobileSchema,
      email: emailSchema,
    }),
    manager: Yup.object().shape({
      name: nameSchema,
      mobile: mobileSchema,
      email: emailSchema,
    }),
  });


  const formik = useFormik({
    initialValues: {
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
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const data = new FormData();
        data.append("dept_full_name", values.fullName);
        data.append("dept_short_name", values.shortName);
        if (values.logo) data.append("dept_logo", values.logo);

        data.append(
          "required_modules",
          values.modules.workProgress2 ? 3 : values.modules.workProgress1 ? 2 : 1
        );
        data.append("created_by", 1);
        data.append("created_by_id", 1101);

        data.append("dept_head_name", values.head.name);
        data.append("dept_head_mobile", values.head.mobile);
        data.append("dept_head_email", values.head.email);

        data.append("operational_manager_name", values.manager.name);
        data.append("operational_manager_mobile", values.manager.mobile);
        data.append("operational_manager_email", values.manager.email);

        await api.post("/data/create-department", data);
        toast.success("Department created successfully!");
        formik.resetForm();
        if (onSuccess) onSuccess();
        onClose();

      } catch (error) {
        toast.error(error.message || "Failed to create department.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Ensure form is fresh on open/close
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;


  const handleModuleToggle = (name, value) => {
    const newModules = { ...formik.values.modules };
    if (name === "workProgress1") {
      newModules.workProgress1 = value;
      if (value) newModules.workProgress2 = false;
    } else if (name === "workProgress2") {
      newModules.workProgress2 = value;
      if (value) newModules.workProgress1 = false;
    } else {
      newModules[name] = value;
    }
    formik.setFieldValue("modules", newModules);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-slate-900/60 backdrop-blur-[2px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[20px] shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#1e293b] p-3 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-500 rounded-lg text-white shadow-lg shadow-indigo-500/30">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Add New Department
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-3 px-5 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {/* Identity Section */}
            <section>
              <SectionHeader icon={Shield} title="Department Identity" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <InputField
                  label="Department Short Name"
                  name="shortName"
                  value={formik.values.shortName}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
                    if (val.length <= 12) {
                      formik.setFieldValue("shortName", val);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shortName && formik.errors.shortName}
                  placeholder="Ex: PWDMH"
                  icon={User}
                  required
                />

                <InputField
                  label="Department Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    if (val.length <= 50) { // Allowing slightly more for full name
                      formik.setFieldValue("fullName", val);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && formik.errors.fullName}
                  placeholder="Ex: Public Works Department, Maharashtra"
                  icon={User}
                  required
                />

              </div>
              <div className="mb-3">
                <InputField
                  label="Department Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && formik.errors.address}
                  placeholder="Enter full department address"
                  icon={Home}
                />
              </div>
              <FileField
                label="Department Logo"
                name="logo"
                value={formik.values.logo}
                onChange={(name, value) => formik.setFieldValue(name, value)}
              />
            </section>

            {/* Combined Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {/* Head Details */}
              <section>
                <SectionHeader
                  icon={CircleCheck}
                  title="Department Head Details"
                />
                <div className="space-y-2">
                  <InputField
                    label="Name"
                    name="head.name"
                    value={formik.values.head.name}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      if (val.length <= 30) {
                        formik.setFieldValue("head.name", val);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.head?.name && formik.errors.head?.name}
                    placeholder="Ex: John Doe"
                    icon={User}
                    required
                    maxLength={30}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Mobile"
                      name="head.mobile"
                      value={formik.values.head.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10 && (val.length === 0 || /^[6-9]/.test(val))) {
                          formik.setFieldValue("head.mobile", val);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.head?.mobile && formik.errors.head?.mobile}
                      placeholder="Ex: 9876543210"
                      icon={Phone}
                      required
                    />
                    <InputField
                      label="Email"
                      name="head.email"
                      value={formik.values.head.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.head?.email && formik.errors.head?.email}
                      placeholder="Ex: head@dept.com"
                      icon={Mail}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Manager Details */}
              <section>
                <SectionHeader
                  icon={CircleCheck}
                  title="Department Operational Manager Details"
                />
                <div className="space-y-3">
                  <InputField
                    label="Name"
                    name="manager.name"
                    value={formik.values.manager.name}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      if (val.length <= 30) {
                        formik.setFieldValue("manager.name", val);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.manager?.name && formik.errors.manager?.name}
                    placeholder="Ex: Jane Smith"
                    icon={User}
                    required
                    maxLength={30}
                  />


                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Mobile"
                      name="manager.mobile"
                      value={formik.values.manager.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10 && (val.length === 0 || /^[6-9]/.test(val))) {
                          formik.setFieldValue("manager.mobile", val);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.manager?.mobile && formik.errors.manager?.mobile}
                      placeholder="Ex: 9876543210"
                      icon={Phone}
                      required
                    />

                    <InputField
                      label="Email"
                      name="manager.email"
                      value={formik.values.manager.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.manager?.email && formik.errors.manager?.email}
                      placeholder="Ex: manager@dept.com"
                      icon={Mail}
                      required
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Modules Section */}
            <section>
              <div className="flex items-center justify-between mb-2">
                <SectionHeader icon={Shield} title="Modules" />
                <div className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Select only one from 2 & 3
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-3">
                <ToggleField
                  label="1-Inspection"
                  name="inspection"
                  checked={formik.values.modules.inspection}
                  onChange={handleModuleToggle}
                />
                <ToggleField
                  label="2-Work Progress + Design + Measurement"
                  name="workProgress1"
                  checked={formik.values.modules.workProgress1}
                  onChange={handleModuleToggle}
                />
                <ToggleField
                  label="3-Work Progress + Design + Measurement + Drone"
                  name="workProgress2"
                  checked={formik.values.modules.workProgress2}
                  onChange={handleModuleToggle}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={formik.handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#1e293b] text-white text-xs font-bold rounded-lg hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Add Department"
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default DeptForm;
