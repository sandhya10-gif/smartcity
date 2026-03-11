import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();

  // 🔐 clear old auth
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      setError(errorText || "Invalid credentials");
      return;
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role); // "ADMIN" or "USER"

    navigate("/dashboard");
  } catch (err) {
    setError("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://d1agmp9y4cki1i.cloudfront.net/images/20240401/smart-digital-city-with-connection-network-reciprocity-cityscape%20%281%29.jpg"
          alt="Smart City"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full p-16 flex flex-col items-center text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Smart City Portal</h1>
          <p className="text-lg max-w-sm opacity-90">
            One platform for jobs, colleges, hospitals & city services
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">

        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold text-cyan-400 text-center mb-2">
            Welcome
          </h2>
          <p className="text-center text-slate-400 mb-10">
            Login to Smart City System
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-cyan-100 focus:ring-1 focus:ring-cyan-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-cyan-100 focus:ring-1 focus:ring-cyan-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-bold text-lg tracking-widest text-white transition-all
                ${loading
                  ? "bg-cyan-300 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-100"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center">
              <div className="flex-grow border-t" />
              <span className="px-4 text-xs text-slate-400">OR</span>
              <div className="flex-grow border-t" />
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center gap-4">
              <button className="w-14 h-14 border rounded-xl flex items-center justify-center">
                <FaGoogle className="text-2xl text-[#DB4437]" />
              </button>
              <button className="w-14 h-14 border rounded-xl flex items-center justify-center">
                <FaFacebookF className="text-2xl text-[#1877F2]" />
              </button>
              <button className="w-14 h-14 border rounded-xl flex items-center justify-center">
                <FaApple className="text-2xl" />
              </button>
            </div>

            {/* REGISTER */}
            <p className="text-center text-sm text-slate-500">
              New user?{" "}
              <span
                onClick={() => navigate("/register")}
                className="font-bold text-slate-900 cursor-pointer hover:underline"
              >
                Register Now
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
