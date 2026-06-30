const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("../config/db");

// 🔐 SIGNUP
exports.signup = async (req, res) => {
    try {

        console.log("Pool acquired");
        const { user_name, Email, password } = req.body;

        if (!user_name || !Email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const pool = await poolPromise;

        // Check if user exists
        const existingUser = await pool.request()
            .input("user_name", sql.VarChar, user_name)
            .query("SELECT * FROM Admin.admin_login WHERE user_name = @user_name");

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await pool.request()
            .input("user_name", sql.VarChar, user_name)
            .input("Email", sql.VarChar, Email)
            .input("password", sql.VarChar, hashedPassword)
            .query(`
                INSERT INTO Admin.admin_login (user_name, Email, password)
                VALUES (@user_name, @Email, @password)
            `);

        res.status(201).json({ message: "User created successfully" });

    }  catch (err) {
        console.error("SIGNUP ERROR:");
        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("user_name", sql.VarChar, user_name)
            .query("SELECT * FROM Admin.admin_login WHERE user_name = @user_name");

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, user_name: user.user_name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};