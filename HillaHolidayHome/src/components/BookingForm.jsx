import React from "react";
import styles from "./BookingForm.module.css";
import { useNavigate } from "react-router-dom";

function BookingForm() {
           //for page navigation
      const navigate = useNavigate();
        const handleEdit = () => {
        navigate("/profile"); // go to customer profile page
    };
    return (
        <div className={styles['booking-container']} >
             <div className={styles['booking-header']} >
                <h2>Customer Information</h2>
                <button className={styles['edit-btn']}  onClick={handleEdit}>Edit Profile</button>
            </div>

            <div className={styles['booking-grid']} >
                <div className={styles['form-group']} >
                    <label>First Name</label>
                    <input type="text" />
                </div>

                <div className={styles['form-group']} >
                    <label>Last Name</label>
                    <input type="text" />
                </div>

                <div className={styles['form-group']} >
                    <label>Booking ID</label>
                    <input type="text" />
                </div>

                {/* Second Row */}
                <div className={[styles['form-group'], styles['span-two']].join(' ')}>
                    <label>Email Id</label>
                    <input type="email" />
                </div>

                <div className={styles['form-group']} >
                    <label>Phone Number</label>
                    <input type="text" />
                </div>

                {/* Third Row */}
                <div className={[styles['form-group'], styles['full-width']].join(' ')}>
                    <label>Comments/Notes</label>
                    <input type="text" />
                </div>
            </div>
        </div>
    );
}

export default BookingForm;