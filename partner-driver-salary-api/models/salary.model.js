const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    driverId: {
        type: String,
        required: true
    },

    salaryType: {
        type: String,
        enum: ["per_order", "monthly"],
        required: true
    },

    payPerOrder: {
        type: Number,
        default: 0
    },

    monthlySalary: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Salary", salarySchema);