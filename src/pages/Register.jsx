import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { IoMdAirplane } from "react-icons/io";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://smartcitybackend-1.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(msg);
      return;
    }

    alert("Registration successful!");
    navigate("/login");

  } catch (err) {
    alert("Server error. Try again later.");
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden font-sans">

      {/* LEFT PANEL – SMART CITY */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://in.nec.com/en_IN/blog/2024/images/Smart_City_og.jpg"
          alt="Smart City"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 w-full p-16 flex flex-col items-center text-center text-white">
          <h1 className="text-6xl font-serif font-bold mb-4 drop-shadow-md">
            Smart City Portal
          </h1>
          <p className="text-lg max-w-sm opacity-95 leading-snug font-light">
            Register once to access jobs, colleges, hospitals, and city services
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white relative">

        {/* Decorative Icon */}
        <div className="absolute top-10 right-10 hidden lg:block w-48 h-24 pointer-events-none">
          <IoMdAirplane className="text-cyan-400 text-3xl absolute right-0 top-0 rotate-[15deg]" />
        </div>

        {/* Register Form */}
        <div className="flex-1 flex items-center justify-center px-8 pt-20 z-10">
          <div className="w-full max-w-md text-center">
            <h2 className="text-5xl font-bold text-cyan-400 mb-2">
              Create Account
            </h2>
            <p className="text-slate-400 text-sm mb-12">
              Register to Smart City System
            </p>

            <form onSubmit={handleRegister} className="space-y-6">


              {/* Email */}
              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-semibold text-cyan-400">
                  Email ID
                </label>
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
                <input
                  type="email"
                  placeholder="user@smartcity.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-semibold text-cyan-400">
                  Password
                </label>
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-lg font-bold text-lg uppercase tracking-widest shadow-lg"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <span
                  className="text-slate-900 font-bold cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
