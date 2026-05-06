import React from "react";
import styles from "./TopBanner.module.css";

function TopBanner({ title, subtitle }) {
    return (
        <div className={styles['top-banner']} >
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}

export default TopBanner;