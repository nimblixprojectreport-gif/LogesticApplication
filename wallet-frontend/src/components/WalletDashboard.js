import React, { useEffect, useState } from "react";
import axios from "axios";

function WalletDashboard() {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");

  const API = "http://127.0.0.1:8000/api";

  const loadWallet = async () => {
    const res = await axios.get(`${API}/wallet/`);
    setWallet(res.data);
  };

  const loadTransactions = async () => {
    const res = await axios.get(`${API}/wallet/transactions/`);
    setTransactions(res.data);
  };

  useEffect(() => {
    loadWallet();
    loadTransactions();
  }, []);

  const handleTopup = async () => {
    await axios.post(`${API}/wallet/topup/`, { amount });
    setAmount("");
    loadWallet();
    loadTransactions();
  };

  const handleWithdraw = async () => {
    await axios.post(`${API}/wallet/withdraw/`, { amount });
    setAmount("");
    loadWallet();
    loadTransactions();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1> 💰Wallet Dashboard </h1>
      <div
        style={{
          background: "#007bff",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2> Current Balance </h2> <h1> ₹{wallet.balance} </h1>{" "}
      </div>
      <div style={{ marginBottom: "30px" }}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleTopup} style={{ marginRight: "10px" }}>
          Top Up{" "}
        </button>
        <button onClick={handleWithdraw}> Withdraw </button>{" "}
      </div>
      <h2> Transaction History </h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th> Type </th> <th> Amount </th> <th> Status </th>{" "}
            <th> Date </th>{" "}
          </tr>{" "}
        </thead>
        <tbody>
          {" "}
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td> {txn.transaction_type} </td> <td> ₹{txn.amount} </td>{" "}
              <td> {txn.status} </td> <td> {txn.created_at} </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>
  );
}

export default WalletDashboard;
