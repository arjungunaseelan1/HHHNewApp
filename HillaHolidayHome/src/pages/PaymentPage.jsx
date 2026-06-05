import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PaymentPage.module.css";

function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState("pending");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        const bookingStatus = status === "completed" ? "Completed" : "Pending";
        const paymentStatus = status === "completed" ? "Paid" : "Unpaid";

        const summaryData = {
            Booking_Number: location.state?.Booking_Number || "",
            Customer_Number: location.state?.Customer_Number || "",
            check_in_date: location.state?.check_in_date || "",
            check_out_date: location.state?.check_out_date || "",
            activity_name: location.state?.activity_name || "None",
            activity_Count: location.state?.activity_Count || "0",
            Activity_Bill: String(location.state?.activity_bill || 0),
            total_amount: location.state?.total_amount || 0,
            tax_amount: location.state?.tax_amount || 0,
            final_amount: location.state?.final_amount || 0,
            booking_status: bookingStatus,
            payment_status: paymentStatus
        };

        try {
            const response = await fetch("http://localhost:5000/api/bookingSummary/insertBookingSummary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(summaryData)
            });

            if (response.ok) {
                alert(`Payment status saved as: ${status === "completed" ? "Booking Completed" : "Booking Pending"}`);
                navigate("/home");
            } else {
                alert("Failed to save booking summary. Please try again.");
            }
        } catch (error) {
            console.error("Error saving booking summary:", error);
            alert("Error connecting to server. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Payment Status</h2>

                <p className={styles.subtitle}>Please select the final status of this booking:</p>

                <div className={styles.optionsContainer}>
                    <label className={`${styles.option} ${status === "completed" ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            name="paymentStatus"
                            value="completed"
                            checked={status === "completed"}
                            onChange={() => setStatus("completed")}
                        />
                        <div className={styles.optionContent}>
                            <span className={styles.optionIcon}>✅</span>
                            <span className={styles.optionText}>Booking Completed</span>
                        </div>
                    </label>

                    <label className={`${styles.option} ${status === "pending" ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            name="paymentStatus"
                            value="pending"
                            checked={status === "pending"}
                            onChange={() => setStatus("pending")}
                        />
                        <div className={styles.optionContent}>
                            <span className={styles.optionIcon}>⏳</span>
                            <span className={styles.optionText}>Booking Pending</span>
                        </div>
                    </label>
                </div>

                <div className={styles.actions}>
                    <button className={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
                    <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Status"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
