require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Log every incoming request
// ==============================
app.use((req, res, next) => {
    console.log("\n========================================");
    console.log("Time:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Headers:", req.headers);
    console.log("Query:", req.query);
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("========================================\n");

    next();
});

// ==============================
// Routes
// ==============================
const bookingRoutes = require("./routes/bookingRoutes");
const loginRoutes = require("./routes/loginRoutes");
const customerRoutes = require("./routes/customerRoutes");
const bookingSummaryRoutes = require("./routes/bookingSummaryRoutes");

app.use("/api/bookingSummary", bookingSummaryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", loginRoutes);
app.use("/api/customers", customerRoutes);

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
    console.error("========== 404 ERROR ==========");
    console.error("Route Not Found");
    console.error("Method:", req.method);
    console.error("URL:", req.originalUrl);

    res.status(404).json({
        success: false,
        message: "Route not found",
        method: req.method,
        url: req.originalUrl,
    });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
    console.error("\n========== INTERNAL SERVER ERROR ==========");
    console.error("Time:", new Date().toISOString());
    console.error("Method:", req.method);
    console.error("URL:", req.originalUrl);
    console.error("Body:", req.body);
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    console.error("Stack Trace:");
    console.error(err.stack);
    console.error("===========================================\n");

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==============================
// Uncaught Exceptions
// ==============================
process.on("uncaughtException", (err) => {
    console.error("\n========== UNCAUGHT EXCEPTION ==========");
    console.error(err);
    console.error(err.stack);
});

// ==============================
// Unhandled Promise Rejections
// ==============================
process.on("unhandledRejection", (reason, promise) => {
    console.error("\n========== UNHANDLED REJECTION ==========");
    console.error("Promise:", promise);
    console.error("Reason:", reason);
});

// ==============================
// Server Start
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("========================================");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log("========================================");
});