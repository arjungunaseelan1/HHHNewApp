import React from "react";
import styles from "./NotificationsPage.module.css";
import { useNavigate } from "react-router-dom";

function NotificationsPage() {
    return (
        <div className={styles['notifications-container']}>
            <h2>Notifications</h2>
            
            <div className={styles['notification-card']}>
                <h3>⚠️ Unfinished Booking Alert</h3>
                <p><strong>Customer:</strong> John Doe (johndoe@example.com)</p>
                <p><strong>Status:</strong> Dropped off at Address Form</p>
                <p><strong>Dates:</strong> Oct 12 - Oct 14, 2026</p>
                <button className={styles['action-btn']}>Send Reminder</button>
            </div>

            <div className={styles['notification-card']}>
                <h3>⚠️ Unfinished Booking Alert</h3>
                <p><strong>Customer:</strong> Jane Smith (jane.smith@example.com)</p>
                <p><strong>Status:</strong> Dropped off at Activities selection</p>
                <p><strong>Dates:</strong> Nov 01 - Nov 05, 2026</p>
                <button className={styles['action-btn']}>Send Reminder</button>
            </div>
            
            {/* Placeholder for future notifications */}
        </div>
    );
}

export default NotificationsPage;
