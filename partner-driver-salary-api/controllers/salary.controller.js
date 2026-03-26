const Salary = require("../models/salary.model");

// Create Salary (Per Order or Monthly)
exports.createSalary = async (req, res) => {
  try {
    const { driverId, salaryType, payPerOrder, monthlySalary } = req.body;

    const salary = new Salary({
      driverId,
      salaryType,
      payPerOrder,
      monthlySalary
    });

    await salary.save();

    res.status(201).json({
      message: "Salary configuration created successfully",
      salary
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating salary",
      error: error.message
    });
  }
};

// Get driver salary
exports.getDriverSalary = async (req, res) => {
  try {
    const driverId = req.params.driverId;

    const salary = await Salary.findOne({ driverId });

    if (!salary) {
      return res.status(404).json({
        message: "Salary configuration not found for this driver"
      });
    }

    let totalSalary = 0;

    if (salary.salaryType === "per_order") {
      const ordersCompleted = req.query.orders || 0;
      totalSalary = ordersCompleted * salary.payPerOrder;
    }

    if (salary.salaryType === "monthly") {
      totalSalary = salary.monthlySalary;
    }

    res.json({
      driverId: salary.driverId,
      salaryType: salary.salaryType,
      totalSalary: totalSalary
    });

  } catch (error) {
    res.status(500).json({
      message: "Error calculating salary",
      error: error.message
    });
  }
};