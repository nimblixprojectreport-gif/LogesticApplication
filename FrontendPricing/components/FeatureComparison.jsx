import { Check } from "lucide-react";

function CellValue({ value }) {
  if (value === true) {
    return <Check size={16} className="mx-auto text-sky-400" />;
  }

  return <span className="text-xs text-slate-400">{value}</span>;
}

function FeatureComparison() {
  const rows = [
    { feature: "API Access", starter: true, pro: true, enterprise: true },
    {
      feature: "Support",
      starter: "Email",
      pro: "24/7 Chat",
      enterprise: "Dedicated",
    },
    { feature: "Insurance", starter: "-", pro: true, enterprise: true },
    { feature: "White-label", starter: "-", pro: "-", enterprise: true },
  ];

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-slate-200">
        Feature Comparison
      </h2>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#091322]">
        <div className="grid grid-cols-4 border-b border-slate-800 bg-[#0d1828] px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <span>Feature</span>
          <span className="text-center">ST</span>
          <span className="text-center">PRO</span>
          <span className="text-center">ENT</span>
        </div>

        {rows.map((row) => (
          <div
            key={row.feature}
            className="grid grid-cols-4 items-center border-b border-slate-800/80 px-3 py-3 last:border-b-0"
          >
            <span className="text-xs text-slate-300">{row.feature}</span>
            <div className="text-center">
              <CellValue value={row.starter} />
            </div>
            <div className="text-center">
              <CellValue value={row.pro} />
            </div>
            <div className="text-center">
              <CellValue value={row.enterprise} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureComparison;