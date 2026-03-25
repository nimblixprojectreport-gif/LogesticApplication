import { CheckCircle2 } from "lucide-react";

function PricingCard({
  title,
  price,
  subtitle,
  description,
  features,
  buttonText,
  active,
}) {
  const handleClick = () => {
    alert(`${title} plan selected`);
  };

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        active
          ? "border-sky-500 bg-gradient-to-b from-sky-600/20 to-[#0d1b30] shadow-lg shadow-sky-900/30"
          : "border-slate-800 bg-[#091322]"
      }`}
    >
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {title}
        </p>
        <div className="mt-2 flex items-end gap-1">
          <h3 className="text-3xl font-bold text-white">{price}</h3>
          <span className="pb-1 text-sm text-slate-400">{subtitle}</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <ul className="mb-4 space-y-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-slate-300"
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sky-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleClick}
        className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          active
            ? "bg-sky-500 text-white hover:bg-sky-400"
            : "border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;