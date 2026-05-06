import React, { useState } from "react";
import styles from "./Calendar.module.css";

function CalendarComponent() {
    const [date, setDate] = useState(new Date());

    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();

    const changeMonth = (dir) => {
        setDate(new Date(date.getFullYear(), date.getMonth() + dir, 1));
    };

    return (
        <div className={styles['calendar-box']} >
            <div className={styles['calendar-header']} >
                <button onClick={() => changeMonth(-1)}>◀</button>
                <span>
                    {date.toLocaleString("default", { month: "short" })}{" "}
                    {date.getFullYear()}
                </span>
                <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            <div className={styles['calendar-grid']} >
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} className={styles['day-name']} >{d}</div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i}></div>
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => (
                    <div key={i} className={styles['calendar-day']} >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CalendarComponent;