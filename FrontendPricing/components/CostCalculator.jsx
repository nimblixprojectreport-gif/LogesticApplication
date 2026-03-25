import { useState } from "react";
import { Calculator } from "lucide-react";

function CostCalculator() {
  const [origin, setOrigin] = useState("Kolkata");
  const [destination, setDestination] = useState("Delhi");
  const [weight, setWeight] = useState("15-50 kg");
  const [estimate, setEstimate] = useState("$99");

  const handleEstimate = () => {
    let price = "$99";

    if (weight === "0-5 kg") price = "$29";
    else if (weight === "5-15 kg") price = "$49";
    else if (weight === "15-50 kg") price = "$99";
    else price = "$149";

    setEstimate(price);
    alert(`Estimated cost from ${origin} to ${destination} is ${price}`);
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#0a1728] p-3 shadow-lg shadow-black/20">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
        <Calculator size={16} className="text-sky-400" />
        <span>Cost Calculator</span>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-slate-400">
              Origin
            </label>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#08111f] px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-slate-400">
              Destination
            </label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-[#08111f] px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-500"
              placeholder="Enter city"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-slate-400">
            Weight Class
          </label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-[#08111f] px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
          >
            <option>0-5 kg</option>
            <option>5-15 kg</option>
            <option>15-50 kg</option>
            <option>50+ kg</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleEstimate}
          className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Calculate Estimate — {estimate}
        </button>
      </div>
    </section>
  );
}

export default CostCalculator;