import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import miLogo from "../assets/icons/mtss_logo_2.png";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [role] = useState("platform_owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("email", email || "admin@mi.com");

      setIsLoggedIn(true);
      setIsSubmitting(false);
      navigate("/");
    }, 1200);
  };

  // If already logged in, show a simple welcome/redirect or the dashboard content
  // But for this task, the user specifically asked for the "login page" here.
  // In AppRouter, we should ensure this is accessible.

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="w-full max-w-[1100px] flex flex-col md:flex-row items-center gap-12 p-6 z-10">
        {/* Left Side: Branding */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Platform Owner Portal
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Micro <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Integrated</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Leading the future of 3D Bharat with advanced infrastructure management and real-time data integration.
          </p>

          <div className="flex items-center gap-8 pt-4 justify-center md:justify-start">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Projects</div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Monitoring</div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Secure</div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-[450px]">
          <div className="glass-dark p-8 md:p-10 rounded-[32px] shadow-2xl relative border border-white/5">
            {/* Mi Logo Overlay */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#0f172a] rounded-3xl p-4 shadow-xl border border-white/10 animate-float">
              <img src={miLogo} alt="MI Logo" className="w-full h-full object-contain" />
            </div>

            <div className="mt-8 text-center space-y-2 mb-10">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400 text-sm">Please enter your details to sign in</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">MI Administrator Email</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                    placeholder="admin@mi.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs px-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-300">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-800 bg-slate-900 accent-cyan-500" />
                  Remember this device
                </label>
                <a href="#" className="text-cyan-500 hover:text-cyan-400 font-medium">Reset Access?</a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-4.5 rounded-2xl font-bold shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Authorize & Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account? <a href="#" className="text-white font-semibold hover:underline">Contact Admin</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        Powered by Micro Integrated Systems
      </div>
    </div>
  );
};

export default Home;
