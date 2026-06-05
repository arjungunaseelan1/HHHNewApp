require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const bookingRoutes = require("./routes/bookingRoutes");
const loginRoutes = require("./routes/loginRoutes");
const customerRoutes = require("./routes/customerRoutes");

const bookingSummaryRoutes = require("./routes/bookingSummaryRoutes");

app.use("/api/bookingSummary", bookingSummaryRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api", loginRoutes);
app.use("/api/customers", customerRoutes);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

