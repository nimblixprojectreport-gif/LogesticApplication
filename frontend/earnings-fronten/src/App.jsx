import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/earnings/",
});

function App() {
  const [earnings, setEarnings] = useState([]);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    fetchEarnings();
    fetchPayouts();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await API.get("");
      setEarnings(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchPayouts = async () => {
    try {
      const res = await API.get("payouts/");
      setPayouts(res.data);
    } catch (err) { console.error(err); }
  };

  // Helper for quick stats
  const totalEarned = earnings.reduce((acc, curr) => acc + Number(curr.earning_amount), 0);
  const totalPayouts = payouts.reduce((acc, curr) => acc + Number(curr.total_amount), 0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Finance Dashboard</h1>
        <p style={styles.subtitle}>Manage driver earnings and settlements</p>
      </header>

      {/* Stats Section */}
      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <span style={styles.cardLabel}>Total Gross Earnings</span>
          <h2 style={styles.cardValue}>₹{totalEarned.toLocaleString()}</h2>
        </div>
        <div style={{ ...styles.card, borderLeft: "4px solid #4caf50" }}>
          <span style={styles.cardLabel}>Successful Payouts</span>
          <h2 style={styles.cardValue}>₹{totalPayouts.toLocaleString()}</h2>
        </div>
        <div style={{ ...styles.card, borderLeft: "4px solid #fb8c00" }}>
          <span style={styles.cardLabel}>Pending Drivers</span>
          <h2 style={styles.cardValue}>{earnings.filter(e => !e.is_paid).length}</h2>
        </div>
      </div>

      <div style={styles.contentGrid}>
        {/* Earnings Table */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Recent Earnings</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Driver ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.id} style={styles.tableRow}>
                    <td>Driver #{e.driver_id}</td>
                    <td style={{ fontWeight: "600" }}>₹{e.earning_amount}</td>
                    <td>
                      <span style={e.is_paid ? styles.badgePaid : styles.badgePending}>
                        {e.is_paid ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payouts Table */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Payout History</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Reference</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} style={styles.tableRow}>
                    <td>TXN-{p.id}</td>
                    <td style={{ fontWeight: "600" }}>₹{p.total_amount}</td>
                    <td>
                      <span style={styles.badgeGeneric}>{p.payout_status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    minHeight: "100vh",
    color: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
  },
  header: { marginBottom: "40px", textAlign: "left" },
  title: { fontSize: "2rem", fontWeight: "700", margin: 0 },
  subtitle: { color: "#94a3b8", marginTop: "8px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  cardLabel: { fontSize: "0.875rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" },
  cardValue: { fontSize: "1.75rem", margin: "10px 0 0 0" },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "30px",
  },
  section: {
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  sectionTitle: { fontSize: "1.25rem", marginBottom: "20px", color: "#e2e8f0" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  tableHeader: { borderBottom: "1px solid rgba(255, 255, 255, 0.1)", color: "#94a3b8" },
  tableRow: { borderBottom: "1px solid rgba(255, 255, 255, 0.05)", height: "50px" },
  badgePaid: {
    background: "rgba(76, 175, 80, 0.15)",
    color: "#81c784",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
  badgePending: {
    background: "rgba(251, 140, 0, 0.15)",
    color: "#ffb74d",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
  badgeGeneric: {
    background: "rgba(255, 255, 255, 0.1)",
    color: "#cbd5e1",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
  }
};

export default App;