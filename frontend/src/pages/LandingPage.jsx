import "./LandingPage.css";
import warehouseImg from "../assets/warehouse.png";
import droneImg from "../assets/drone.png";
import { FaTruck } from "react-icons/fa";
import { FaGlobe, FaShareAlt, FaEnvelope } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navbar - unchanged */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <FaTruck />
          </div>
          <span className="logo-text">LogiTrack</span>
        </div>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="get-started-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section with Warehouse Image on Top */}
      <section className="hero">
        {/* Warehouse Image */}
        <div className="hero-image-wrapper">
          <div className="hero-image">
            <img src={warehouseImg} alt="Modern Warehouse" />
          </div>
        </div>

        {/* Content that matches your screenshot */}
        <div className="hero-content">
          <h1>Modern Logistics for <span className="highlight">Fast Delivery</span></h1>
          
          <p>
            Streamline your shipping operations with our AI-powered SaaS platform. 
            Efficient, secure, and built for global scale.
          </p>

          <button className="trial-btn">Start Free Trial →</button>

          <div className="tracking-bar">
            <input
              type="text"
              placeholder="Enter tracking number..."
            />
            <button className="track-btn">Track</button>
          </div>

          <div className="stats">
            <div className="stat">
              <h3>99.9%</h3>
              <p>UPTIME</p>
            </div>
            <div className="stat">
              <h3>2M+</h3>
              <p>SHIPMENTS</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>SUPPORT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency Redefined + Key Value Propositions (exact text from screenshot) */}
      <div className="efficiency">
        <p className="label">EFFICIENCY REDEFINED</p>
      </div>

      <section className="features">
        <h2>Key Value Propositions</h2>
         <p className="section-subtitle">
            We provide the tools you need to manage your global supply chain with total visibility.
         </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Fast Shipping</h3>
            <p>Real-time route optimization for the quickest possible delivery paths.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure Handling</h3>
            <p>End-to-end cargo insurance and physical security protocols for peace of mind.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🛟</div>
            <h3>Reliable Support</h3>
            <p>24/7 dedicated logistics experts available via chat, phone, or email.</p>
          </div>
        </div>
      </section>

      {/* Drone Section - unchanged */}
      <section className="drone-section">
        <div className="drone-container">
          <div className="drone-text">
            <h2>Autonomous Drone Delivery</h2>
            <p>
              Experience the future of logistics with automated drone shipments for faster, 
              eco-friendly last-mile delivery.
            </p>
          </div>
          <img src={droneImg} alt="Autonomous Delivery Drone" className="drone-image" />
          <button className="explore-btn">Explore Drones</button>
        </div>
        
      </section>

      <footer className="footer">
  <div className="footer-container">

    {/* TOP */}
    <div className="footer-left">
      <h2><FaTruck /> LogiTrack</h2>
      <p>Building the operating system for global trade and local delivery.</p>

      {/* LINKS BELOW */}
      <div className="footer-links">
  <div>
    <h4>PLATFORM</h4>
    <p>Tracking</p>
    <p>Pricing</p>
    <p>Security</p>
  </div>

  <div>
    <h4>COMPANY</h4>
    <p>About Us</p>
    <p>Careers</p>
    <p>Contact</p>
  </div>
</div>
    </div>

  </div>

  {/* DIVIDER */}
  <div className="footer-divider"></div>

  {/* BOTTOM */}
  <div className="footer-bottom">
    <div className="footer-icons">
      <FaGlobe />
      <FaShareAlt />
      <FaEnvelope />
    </div>
    <p>© 2026 LogiTrack SaaS. All rights reserved.</p>
  </div>
</footer>
    </div>
  );
}