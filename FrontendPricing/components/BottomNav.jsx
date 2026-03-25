import {
  LayoutDashboard,
  PackageCheck,
  BadgeDollarSign,
  UserCircle2,
} from "lucide-react";

function BottomNav({ activeTab, setActiveTab }) {
  const items = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Shipments", icon: PackageCheck },
    { label: "Pricing", icon: BadgeDollarSign },
    { label: "Profile", icon: UserCircle2 },
  ];

  return (
    <nav className="sticky bottom-0 border-t border-slate-800 bg-[#07111d]/95 backdrop-blur">
      <div className="grid grid-cols-4 px-2 py-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveTab(item.label)}
              className="flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] transition hover:bg-slate-800/50"
            >
              <Icon
                size={18}
                className={isActive ? "text-sky-400" : "text-slate-400"}
              />
              <span className={isActive ? "text-sky-400" : "text-slate-400"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;