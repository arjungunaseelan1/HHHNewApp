const { sql, poolPromise } = require("../config/db");

exports.insertCustomer = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            customerType,
            dob,
            email,
            phone,
            comments,
            street,
            city,
            state,
            country,
            zipcode
        } = req.body;

        const file = req.file;

        // Convert file → buffer
        const fileBuffer = file ? file.buffer : null;

        const pool = await poolPromise;

        await pool.request()
            .input("Guest_Name", sql.VarChar, `${firstName} ${lastName}`)
            .input("Contact_Number", sql.VarChar, phone)
            .input("Guest_Address", sql.VarChar, street)
            .input("State", sql.VarChar, state)
            .input("Country", sql.VarChar, country)
            .input("ID_Proof", sql.VarBinary, fileBuffer)
            .input("Customer_Type", sql.VarChar, customerType)
            .input("Email_ID", sql.VarChar, email)
            .input("DOB", sql.VarChar, dob)
            .input("Comments", sql.VarChar, comments)
            .input("Street", sql.VarChar, street)
            .input("City", sql.VarChar, city)
            .input("ZIPCODE", sql.VarChar, zipcode)
            .execute("InsertCustomer");

        res.json({ message: "Customer saved with file" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error inserting customer" });
    }
};

 exports.getCustomers = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT 
                -- Split First & Last Name
                LEFT(Guest_Name, CHARINDEX(' ', Guest_Name + ' ') - 1) AS FirstName,
                SUBSTRING(Guest_Name, CHARINDEX(' ', Guest_Name + ' ') + 1, LEN(Guest_Name)) AS LastName,


                -- Format DOB as dd-mm-yyyy
                FORMAT(CAST(DOB AS DATE), 'dd-MM-yyyy') AS DateOfBirth,

                Email_ID AS EmailId,
                Contact_Number AS PhoneNumber,
                Comments AS CommentsNotes,
                Customer_Number as Customer_Number

            FROM Admin.Customers
        `);

        res.json(result.recordset);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching customers" });
    }
};