import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getWallet = () => API.get("/wallet/");
export const getTransactions = () => API.get("/wallet/transactions/");
export const topUp = (data) => API.post("/wallet/topup/", data);
export const withdraw = (data) => API.post("/wallet/withdraw/", data);
