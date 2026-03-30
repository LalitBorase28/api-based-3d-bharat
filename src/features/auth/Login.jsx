import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { emailSchema, passwordSchema } from "../../utils/validation";

const Login = ({ setIsLoggedIn }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: emailSchema,
      password: passwordSchema,
    }),
    onSubmit: (values) => {
      setIsAuthenticating(true);
      // Dummy login simulation
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "owner");
        localStorage.setItem("email", values.email);

        setIsLoggedIn(true);
        navigate("/dashboard");
        setIsAuthenticating(false);
      }, 800);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="w-full max-w-md px-6 z-10">
        <div className="glass-dark p-8 rounded-[32px] shadow-2xl border border-white/5 relative">
          {/* Logo/Icon Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-h1 text-white">MI Owner Login</h1>
            <p className="text-body text-slate-400 mt-1">3D Bharat Platform Administration</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-label text-slate-400">Email Address</label>
                {formik.touched.email && formik.errors.email && (
                  <span className="text-[10px] font-bold text-red-400 animate-in fade-in slide-in-from-right-1">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${formik.touched.email && formik.errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@mi-owner.com"
                  className={`block w-full pl-11 pr-4 py-3 bg-white/5 border rounded-2xl text-input text-white placeholder:text-[10.5px] placeholder:text-slate-500 focus:ring-2 focus:bg-white/10 transition-all outline-none ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-400/50 focus:ring-red-400/20' 
                      : 'border-white/10 focus:ring-indigo-500/50'
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-label text-slate-400">Password</label>
                {formik.touched.password && formik.errors.password && (
                  <span className="text-[10px] font-bold text-red-400 animate-in fade-in slide-in-from-right-1">
                    {formik.errors.password}
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className={`block w-full pl-11 pr-4 py-3 bg-white/5 border rounded-2xl text-input text-white placeholder:text-[10.5px] placeholder:text-slate-500 focus:ring-2 focus:bg-white/10 transition-all outline-none ${
                    formik.touched.password && formik.errors.password 
                      ? 'border-red-400/50 focus:ring-red-400/20' 
                      : 'border-white/10 focus:ring-indigo-500/50'
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white py-3.5 rounded-2xl text-button shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-caption text-slate-500">
              &copy; 2026 3D Bharat. Powered by Micro Integrated.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

