
import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/notifications/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc0Mzc3MTgzLCJpYXQiOjE3NzQzNzM1ODMsImp0aSI6ImRiMjRiNTIyYTQ1MTQ0YWNhNzYzYjU4NWExMDI1ZTQ2IiwidXNlcl9pZCI6IjIifQ.rlrUAoT4jHfkSekUV_Krz4r01C5XRJC1B98SwQHePOM"; // 🔥 replace with your token

function App() {
  const [notifications, setNotifications] = useState([]);

  // Load notifications
  const loadNotifications = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Mark as read
  const markRead = async (id) => {
    try {
      await fetch(`${API_URL}${id}/read/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      loadNotifications();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Auto load + polling
  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  // Count unread
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h2>🔔 My Notifications</h2>

        <div className="bell">
          🔔 <span className="count">{unreadCount}</span>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`card ${n.is_read ? "read" : "unread"}`}
        >
          {/* Badge */}
          <span className={`badge ${n.is_read ? "read" : "new"}`}>
            {n.is_read ? "Read" : "New"}
          </span>

          {/* Content */}
          <h4>{n.title}</h4>
          <p>{n.message}</p>
          <small>{new Date(n.created_at).toLocaleString()}</small>

          {/* Button */}
          {!n.is_read && (
            <button onClick={() => markRead(n.id)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}

    </div>
  );
}

export default App;