// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 px-10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-cyan-500">Smart<span className="text-slate-800">City</span></h2>
          <p className="text-slate-400 text-sm">Empowering citizens with real-time urban data.</p>
        </div>
        <div className="flex gap-8 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-cyan-500">About</a>
          <a href="#" className="hover:text-cyan-500">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-500">Contact</a>
        </div>
        <p className="text-slate-400 text-xs">© 2026 SmartCity. All rights reserved.</p>
      </div>
    </footer>
  );
}