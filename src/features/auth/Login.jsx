import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("department");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login
    console.log({ role, email, password });

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);

    //  VERY IMPORTANT
    setIsLoggedIn(true);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {role === "department" ? "Department Login" : "Contractor Login"}
        </h2>

        {/* Role Switch */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => setRole("department")}
            className={`w-1/2 py-2 font-semibold ${
              role === "department" ? "bg-indigo-600 text-white" : "bg-gray-100"
            }`}
          >
            Department
          </button>
          <button
            onClick={() => setRole("contractor")}
            className={`w-1/2 py-2 font-semibold ${
              role === "contractor" ? "bg-indigo-600 text-white" : "bg-gray-100"
            }`}
          >
            Contractor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
