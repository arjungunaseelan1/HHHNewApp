const { sql, poolPromise } = require("../config/db");

exports.insertBilling = async (req, res) => {
    try {
        const {
            customerName,
            customerPhone,
            customerEmail,
            checkIn,
            checkOut,
            totalDays,
            totalGuests,
            rooms,
            pricePerRoom,
            roomCost,
            activitiesTotal,
            subTotal,
            gst,
            grandTotal,
            activities
        } = req.body;

        const pool = await poolPromise;

        // 1️⃣ Insert Booking (basic details)
        const bookingResult = await pool.request()
            .input("Customer_Name", sql.VarChar, customerName)
            .input("Phone", sql.VarChar, customerPhone)
            .input("Email", sql.VarChar, customerEmail)
            .input("Check_In", sql.DateTime, checkIn)
            .input("Check_Out", sql.DateTime, checkOut)
            .input("Guests", sql.Int, totalGuests)
            .execute("InsertBookingSummary");

        const bookingNumber = bookingResult.recordset[0].Booking_Number;

        // 2️⃣ Insert Billing
        await pool.request()
            .input("Booking_Number", sql.Int, bookingNumber)
            .input("Rooms", sql.Int, rooms)
            .input("Price_Per_Room", sql.Decimal(10,2), pricePerRoom)
            .input("Room_Cost", sql.Decimal(10,2), roomCost)
            .input("Activities_Total", sql.Decimal(10,2), activitiesTotal)
            .input("Sub_Total", sql.Decimal(10,2), subTotal)
            .input("GST", sql.Decimal(10,2), gst)
            .input("Grand_Total", sql.Decimal(10,2), grandTotal)
            .execute("InsertBilling");

        // 3️⃣ Insert Activities
        for (const act of activities) {
            await pool.request()
                .input("Booking_Number", sql.Int, bookingNumber)
                .input("Activity_Name", sql.VarChar, act.name)
                .input("Count", sql.Int, act.count)
                .input("Price", sql.Decimal(10,2), act.price)
                .execute("InsertBookingActivity");
        }

        res.json({
            message: "Booking + Billing saved",
            bookingNumber
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving billing" });
    }
};