import React from "react";
import styles from "../pages/ActivityPage.module.css";

function ActivityCard({ item, onChange }) {
    return (
        <div className={styles['activity-card']} >

            {/* ✅ Image */}
            <img src={item.image} alt={item.name} className={styles['activity-img']}  />

            <h3>₹{item.price}</h3>
            <p>{item.type}</p>
            <h2>{item.name}</h2>

            <div className={styles['counter']} >
                <button onClick={() => onChange(-1)}>−</button>
                <span>{item.count}</span>
                <button onClick={() => onChange(1)}>+</button>
            </div>
        </div>
    );
}

export default ActivityCard;