import React from "react";
import styles from "../pages/AdminDashboard.module.css";

function StatsCard({ value, label }) {
    return (
        <div className={styles['stat-card']} >
            <h2>{value}</h2>
            <p>{label}</p>
        </div>
    );
}

export default StatsCard;