import React from "react";
import styles from "./ActivityForm.module.css";

function ActivityForm({ formData = {}, onChange }) {
    return (
        <div className={styles['activity-form-container']} >
            <h2>Booking Information</h2>
            <p className={styles['sub-text']} >Enter guest details for activity booking</p>

            <div className={styles['activity-form-grid']} >
                {/* Guest Name */}
                <div className={styles['form-group']} >
                    <label>Guest Name</label>
                    <input type="text" name="guestName" value={formData.guestName || ""} onChange={onChange} placeholder="Guest Name/Full Name" />
                </div>

                {/* Phone */}
                <div className={styles['form-group']} >
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={formData.phone || ""} onChange={onChange} placeholder="Phone Number" />
                </div>

                {/* Date */}
                {/* <div className={styles['form-group']} >
                    <label>Activity Date</label>
                    <div className={styles['date-group']} >
                        <input type="text" placeholder="DD" />
                        <input type="text" placeholder="MM" />
                        <input type="text" placeholder="YYYY" />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ActivityForm;