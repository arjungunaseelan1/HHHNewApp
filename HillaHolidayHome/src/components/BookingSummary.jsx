import React from "react";
import styles from "../pages/ActivityPage.module.css";

function BookingSummary({ activities }) {
    const total = activities.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    const gst = total * 0.1;

    return (
        <div className={styles['summary-box']} >
            <h3>🛒 Booking Summary</h3>

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

            <button className={styles['confirm-btn']} >Confirm Booking</button>
        </div>
    );
}

export default BookingSummary;