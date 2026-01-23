import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function StatCard({ title, count, to }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="bg-white rounded-3xl p-8 border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-500 group cursor-pointer relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100" />

      <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 relative z-10">
        {title}
      </h3>

      <p className="text-5xl font-bold text-slate-800 tracking-tight relative z-10">
        {count}
        <span className="text-cyan-400 text-2xl ml-1">+</span>
      </p>

      <div className="mt-6 flex items-center gap-2 text-cyan-500 font-bold text-sm relative z-10">
        <span>VIEW DATA</span>
        <HiOutlineArrowNarrowRight className="group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  );
}
