const { sql, poolPromise } = require("../config/db");


// INSERT BOOKING SUMMARY
exports.insertBookingSummary = async (req, res) => {
    try {

        const {
            Booking_Number,
            Customer_Number,
            check_in_date,
            check_out_date,
            activity_name,
            activity_Count,
            Activity_Bill,
            total_amount,
            tax_amount,
            final_amount,
            booking_status,
            payment_status
        } = req.body;

        const pool = await poolPromise;

        await pool.request()

            .input("Booking_Number", sql.Int, Booking_Number)
            .input("Customer_Number", sql.Int, Customer_Number)

            .input("check_in_date", sql.Date, check_in_date)
            .input("check_out_date", sql.Date, check_out_date)

            .input("activity_name", sql.VarChar, activity_name)
            .input("activity_Count", sql.Int, activity_Count)
            .input("Activity_Bill", sql.VarChar, Activity_Bill)

            .input("total_amount", sql.Decimal(12, 2), total_amount)
            .input("tax_amount", sql.Decimal(12, 2), tax_amount)
            .input("final_amount", sql.Decimal(12, 2), final_amount)

            .input("booking_status", sql.VarChar, booking_status)
            .input("payment_status", sql.VarChar, payment_status)

            .query(`
                INSERT INTO admin.booking_summary
                (
                    Booking_Number,
                    Customer_Number,
                    check_in_date,
                    check_out_date,
                    activity_name,
                    activity_Count,
                    Activity_Bill,
                    total_amount,
                    tax_amount,
                    final_amount,
                    booking_status,
                    payment_status
                )

                VALUES
                (
                    @Booking_Number,
                    @Customer_Number,
                    @check_in_date,
                    @check_out_date,
                    @activity_name,
                    @activity_Count,
                    @Activity_Bill,
                    @total_amount,
                    @tax_amount,
                    @final_amount,
                    @booking_status,
                    @payment_status
                )
            `);

        res.json({
            message: "Booking Summary inserted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error inserting booking summary"
        });
    }
};



// GET ALL BOOKING SUMMARIES
exports.getBookingSummaries = async (req, res) => {

    try {

        const pool = await poolPromise;

        const result = await pool.request()

            .query(`
                SELECT

                    booking_summary_id,
                    Booking_Summary_Number,
                    Booking_Number,
                    Customer_Number,

                    FORMAT(booking_date, 'dd-MM-yyyy') AS booking_date,

                    FORMAT(check_in_date, 'dd-MM-yyyy') AS check_in_date,

                    FORMAT(check_out_date, 'dd-MM-yyyy') AS check_out_date,

                    activity_name,
                    activity_Count,
                    Activity_Bill,

                    total_amount,
                    tax_amount,
                    final_amount,

                    booking_status,
                    payment_status

                FROM admin.booking_summary

                ORDER BY booking_summary_id DESC
            `);

        res.json(result.recordset);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error fetching booking summaries"
        });
    }
};



// GET BOOKING SUMMARY BY ID
exports.getBookingSummaryById = async (req, res) => {

    try {

        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()

            .input("booking_summary_id", sql.Int, id)

            .query(`
                SELECT *

                FROM admin.booking_summary

                WHERE booking_summary_id = @booking_summary_id
            `);

        res.json(result.recordset[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error fetching booking summary"
        });
    }
};



// UPDATE BOOKING SUMMARY
exports.updateBookingSummary = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            booking_status,
            payment_status
        } = req.body;

        const pool = await poolPromise;

        await pool.request()

            .input("booking_summary_id", sql.Int, id)

            .input("booking_status", sql.VarChar, booking_status)

            .input("payment_status", sql.VarChar, payment_status)

            .query(`
                UPDATE admin.booking_summary

                SET

                    booking_status = @booking_status,

                    payment_status = @payment_status,

                    updated_at = GETDATE()

                WHERE booking_summary_id = @booking_summary_id
            `);

        res.json({
            message: "Booking Summary updated successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error updating booking summary"
        });
    }
};




// DELETE BOOKING SUMMARY
exports.deleteBookingSummary = async (req, res) => {

    try {

        const { id } = req.params;

        const pool = await poolPromise;

        await pool.request()

            .input("booking_summary_id", sql.Int, id)

            .query(`
                DELETE FROM admin.booking_summary

                WHERE booking_summary_id = @booking_summary_id
            `);

        res.json({
            message: "Booking Summary deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Error deleting booking summary"
        });
    }
};