import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getShipments = () => API.get("shipments/");
export const createShipment = (data) => API.post("shipments/", data);
export const updateStatus = (id, status) =>
  API.post(`shipments/${id}/update_status/`, { status });

export const cancelShipment = (id) => API.post(`shipments/${id}/cancel/`);

export const markRTO = (id) => API.post(`shipments/${id}/mark_rto/`);

export const bulkUpdate = (data) =>
  API.post(`shipments/bulk_update_status/`, data);
