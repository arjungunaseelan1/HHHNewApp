import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/ActivityPage.module.css";

function BookingSummary({ activities }) {
    const navigate = useNavigate();
    const total = activities.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    const gst = total * 0.1;

    return (
        <div className={styles['summary-box']} >
            <h3>🛒 Activities Summary</h3>

            {activities.map(
                (item, i) =>
                    item.count > 0 && (
                        <p key={i}>
                            {item.name} × {item.count}
                        </p>
                    )
            )}

            <hr />
            <p>Sub Total: ₹{total}</p>
            <p>GST: ₹{gst}</p>
            <h4>Total Amount ₹{total + gst}</h4>

            <button className={styles['confirm-btn']} onClick={() => navigate('/final-summary', { state: { activities } })}>Complete Booking</button>
        </div>
    );
}

export default BookingSummary;