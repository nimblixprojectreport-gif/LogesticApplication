import { useState } from "react";
import Header from "./components/Header";
import CostCalculator from "./components/CostCalculator";
import PricingCard from "./components/PricingCard";
import FeatureComparison from "./components/FeatureComparison";
import BottomNav from "./components/BottomNav";

function App() {
  const [activeTab, setActiveTab] = useState("Pricing");

  const plans = [
    {
      title: "Starter",
      price: "$49",
      subtitle: "/mo",
      description: "Perfect for small deliveries",
      features: [
        "Up to 100 shipments/mo",
        "Basic live tracking",
        "API Access",
      ],
      buttonText: "Get Started",
      active: false,
    },
    {
      title: "Professional",
      price: "$149",
      subtitle: "/mo",
      description: "Scale your logistics smoothly",
      features: [
        "Unlimited shipments",
        "Advanced API Access",
        "Real-time analytics",
      ],
      buttonText: "Start Free Trial",
      active: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      subtitle: "",
      description: "Tailored service for large networks",
      features: [
        "Dedicated support",
        "White-label tracking",
        "Global warehouse coverage",
      ],
      buttonText: "Contact Sales",
      active: false,
    },
  ];

  const renderTabContent = () => {
    if (activeTab === "Dashboard") {
      return (
        <section className="rounded-2xl border border-slate-800 bg-[#0a1728] p-4">
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <p className="mt-2 text-sm text-slate-300">
            Dashboard section.
          </p>
        </section>
      );
    }

    if (activeTab === "Shipments") {
      return (
        <section className="rounded-2xl border border-slate-800 bg-[#0a1728] p-4">
          <h2 className="text-lg font-semibold text-white">Shipments</h2>
          <p className="mt-2 text-sm text-slate-300">
            Shipment section.
          </p>
        </section>
      );
    }

    if (activeTab === "Profile") {
      return (
        <section className="rounded-2xl border border-slate-800 bg-[#0a1728] p-4">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <p className="mt-2 text-sm text-slate-300">
            Profile section.
          </p>
        </section>
      );
    }

    return (
      <>
        <CostCalculator />

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Choose your plan
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {plans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </section>

        <FeatureComparison />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f2744,_#030b16_55%)] px-3 py-4 text-slate-100">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-slate-800/70 bg-[#06111d]/95 shadow-2xl shadow-sky-950/30">
        <Header />

        <main className="space-y-5 px-4 py-4">{renderTabContent()}</main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;