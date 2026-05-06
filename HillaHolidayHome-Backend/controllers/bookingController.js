const { sql, poolPromise } = require("../config/db");

// GET all bookings
exports.getBookings = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query("SELECT * FROM Admin.Bookings");

        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
};

// CREATE booking
exports.insertBooking = async (req, res) => {
    try {
        const {
            customerNumber,
            couponCode,
            numberOfGuests,
            checkIn,
            checkOut
        } = req.body;
         console.log("Incoming:", req.body);

        const pool = await poolPromise;

        await pool.request()
            .input("Customer_Number", sql.Int, customerNumber)
            .input("Coupon_Code", sql.VarChar, couponCode || null)
            .input("No_Of_Guest", sql.Int, numberOfGuests)
            .input("Check_In", sql.DateTime, checkIn)
            .input("Check_Out", sql.DateTime, checkOut)
            .execute("InsertBooking");

        res.json({ message: "Booking created successfully" });

    } catch (err) {
        console.error(err);
       
        res.status(500).json({ message: "Error inserting booking" });
    }
};