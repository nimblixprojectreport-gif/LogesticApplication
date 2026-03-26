import { useState } from "react";
import "./LogesticServices.css";
import homeIcon from "../assets/home.svg";
import serviceIcon from "../assets/service_logo.svg";
import locationIcon from "../assets/location.svg";
import userIcon from "../assets/profile.svg";

const services = [
  {
    id: 1,
    icon: "🚀",
    title: "Hyperlocal Delivery",
    description:
      "Delivery within 2 hours across your city. Perfect for urgent parcels and local orders.",
    tags: ["FAST", "RELIABLE", "REAL-TIME"],
    price: "$4.99",
    priceLabel: "/ starting",
    cta: "Learn More",
    ctaType: "secondary",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "#3B82F6",
  },
  {
    id: 2,
    icon: "🚚",
    title: "Intercity Shipping",
    description:
      "Seamless transport between cities with guaranteed next-day delivery for business essentials.",
    tags: ["NEXT-DAY", "SECURE"],
    price: "$12.50",
    priceLabel: "/ starting",
    cta: "Learn More",
    ctaType: "secondary",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    accent: "#3B82F6",
  },
  {
    id: 3,
    icon: "🏢",
    title: "Enterprise Solutions",
    description:
      "End-to-end supply chain management for large scale operations with custom API integrations.",
    tags: ["API ACCESS", "SCALABLE"],
    price: "Custom",
    priceLabel: "pricing",
    cta: "Contact Sales",
    ctaType: "primary",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    accent: "#3B82F6",
    priceHighlight: true,
  },
];

const navItems = [
  { icon: homeIcon, label: "Home" },
  { icon: serviceIcon, label: "Services" },
  { icon: locationIcon, label: "Track" },
  { icon: userIcon, label: "Profile" },
];

function LogesticServices() {
  const [activeNav, setActiveNav] = useState("Services");

  return (
    <div className="ls-root">
      {/* Top Navbar */}
      <header className="ls-header">
        <button className="ls-menu-btn">
          <span className="ls-menu-icon">≡</span>
        </button>
        <h1 className="ls-header-title">Logistics Services</h1>
        <button className="ls-profile-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#3B82F6" strokeWidth="2" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="ls-main">
        {/* Hero Section */}
        <section className="ls-hero-section">
          <h2 className="ls-hero-title">Our Solutions</h2>
          <p className="ls-hero-subtitle">
            Streamline your shipping with our modern logistics platform tailored
            for every need.
          </p>
        </section>

        {/* Service Cards */}
        <div className="ls-card-list">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="ls-bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`ls-nav-item ${activeNav === item.label ? "ls-nav-item--active" : ""}`}
            onClick={() => setActiveNav(item.label)}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`ls-nav-icon ${activeNav === item.label ? "ls-nav-icon--active" : ""}`}
            />
            <span
              className={`ls-nav-label ${activeNav === item.label ? "ls-nav-label--active" : ""}`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`ls-card ${hovered ? "ls-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Image */}
      <div className="ls-card-image-wrap">
        <img
          src={service.image}
          alt={service.title}
          className="ls-card-image"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="ls-image-overlay" />
      </div>

      {/* Card Body */}
      <div className="ls-card-body">
        {/* Title Row */}
        <div className="ls-title-row">
          <span className="ls-service-icon">{service.icon}</span>
          <h3 className="ls-card-title">{service.title}</h3>
        </div>

        {/* Description */}
        <p className="ls-card-desc">{service.description}</p>

        {/* Tags */}
        <div className="ls-tags-row">
          {service.tags.map((tag) => (
            <span key={tag} className="ls-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="ls-divider" />

        {/* Price + CTA Row */}
        <div className="ls-price-row">
          <div className="ls-price-wrap">
            <span
              className={`ls-price ${service.priceHighlight ? "ls-price--highlight" : ""}`}
            >
              {service.price}
            </span>
            <span className="ls-price-label"> {service.priceLabel}</span>
          </div>
          <button
            className={
              service.ctaType === "primary"
                ? "ls-cta ls-cta--primary"
                : "ls-cta ls-cta--secondary"
            }
          >
            {service.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogesticServices;