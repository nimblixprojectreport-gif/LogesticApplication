import { ArrowLeft, Info } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-[#071423] px-4 py-3">
      <button
        type="button"
        onClick={() => alert("Back button clicked")}
        className="rounded-full p-1 text-slate-300 transition hover:bg-slate-800"
      >
        <ArrowLeft size={18} />
      </button>

      <h1 className="text-sm font-semibold tracking-wide text-slate-100">
        Pricing Plans
      </h1>

      <button
        type="button"
        onClick={() => alert("Info button clicked")}
        className="rounded-full p-1 text-slate-300 transition hover:bg-slate-800"
      >
        <Info size={16} />
      </button>
    </header>
  );
}

export default Header;