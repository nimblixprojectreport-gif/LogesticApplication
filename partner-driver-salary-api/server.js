const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const salaryRoutes = require("./routes/salary.routes");
app.use("/salary", salaryRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Driver Salary API is running...");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/salaryDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});