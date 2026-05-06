import React, { useState } from "react";
import styles from "./HomePage.module.css";
import "../layouts/SideBar.jsx";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function HomePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { propertyInfo, bookingDates, setBookingDates } = useBooking();
    const { start: startDate, end: endDate } = bookingDates;

    // 📅 Get days in month
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    // 📅 Handle date click
    const handleDateClick = (day) => {
        const selected = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        if (!startDate) {
            setBookingDates({ start: selected, end: null });
        } else if (!endDate) {
            if (selected > startDate) {
                setBookingDates({ start: startDate, end: selected });
            } else {
                setBookingDates({ start: selected, end: null });
            }
        } else {
            setBookingDates({ start: selected, end: null });
        }
    };
    //for Booking page navigation
      const navigate = useNavigate();
        const handleBooking = () => {
        if (!startDate || !endDate) {
            alert("Please select a check-in and check-out date first!");
            return;
        }
        navigate("/profile"); // go to profile
    };


    // 🎯 Check selected range
    const isSelected = (day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        if (startDate && endDate) {
            return date >= startDate && date <= endDate;
        }
        return startDate && date.getTime() === startDate.getTime();
    };

    // ⬅️➡️ Month navigation
    const changeMonth = (dir) => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + dir,
                1
            )
        );
    };

    return (
        <div className={styles['home-page']} >

            {/* Property */}
          <div className={styles['property-card']} >
            <img src={propertyInfo.image} alt="property" />
            <div>
                <h2>{propertyInfo.name}</h2>
                <p>{propertyInfo.currency}{propertyInfo.price.toLocaleString("en-IN")} / night</p>

                {/* ✅ Add this button */}
                <button className={styles['book-btn']}  onClick={handleBooking}>Book Now</button>
            </div>
        </div>

            {/* Calendar */}
            <div className={styles['calendar-container']} >
                <div className={styles['calendar-header']} >
                    <button onClick={() => changeMonth(-1)}>◀</button>
                    <h3>
                        {currentDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h3>
                    <button onClick={() => changeMonth(1)}>▶</button>
                </div>

                <div className={styles['calendar-grid']} >
                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                        <div key={d} className={styles['day-name']} >{d}</div>
                    ))}

                    {/* Empty spaces */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={"empty" + i}></div>
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        return (
                            <div
                                key={day}
                                className={`${styles['calendar-day']} ${isSelected(day) ? styles['selected'] : ''}`}
                                onClick={() => handleDateClick(day)}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>

                <p className={styles['selected-dates']} >
                    {startDate && !endDate && `Start: ${startDate.toDateString()}`}
                    {startDate && endDate &&
                        `From ${startDate.toDateString()} to ${endDate.toDateString()}`}
                </p>
            </div>
        </div>
    );
}