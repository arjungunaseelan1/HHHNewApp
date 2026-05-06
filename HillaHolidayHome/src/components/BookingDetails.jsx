import React from "react";
import styles from "./BookingDetails.module.css";
import { useBooking } from "../context/BookingContext";

function BookingDetails() {
    const { bookingDates, guests, setGuests, totalDays } = useBooking();
    const { start, end } = bookingDates;

    return (
        <div className={styles['booking-details-container']} >
            <h2 className={styles['booking-title']} >Booking Details</h2>

            {/* Dates */}
            <div className={styles['date-row']} >
                <div>
                    <label>Check In Date</label>
                    <div className={styles['date-display']} style={{padding: '10px', background: '#f5f7fa', borderRadius: '8px'}}>{start ? start.toDateString() : "Not Selected"}</div>
                </div>

                <div>
                    <label>Check Out Date</label>
                    <div className={styles['date-display']} style={{padding: '10px', background: '#f5f7fa', borderRadius: '8px'}}>{end ? end.toDateString() : "Not Selected"}</div>
                </div>
            </div>

            {/* Info box */}
            {totalDays > 0 && (
                <div className={styles['info-box']} >
                    {totalDays} Nights, Check in 10:00 AM &nbsp; Check Out: 11:00 AM
                </div>
            )}

            {/* Counters */}
            <div className={styles['counter-row']} >
                {/* Total Guests globally shared */}
                <div className={styles['counter-group']} >
                    <label>Total Guests</label>
                    <div className={styles['counter']} >
                        <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                        <span>{guests}</span>
                        <button onClick={() => setGuests(guests + 1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetails;