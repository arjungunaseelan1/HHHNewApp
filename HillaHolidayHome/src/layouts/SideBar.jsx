import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

function SideBar() {
    return (
        <div className={styles['sidebar']} >

            <ul>
                <li><NavLink to="/AdminDashboard" className={({isActive}) => isActive ? `${styles['nav-link']} ${styles['active']}` : styles['nav-link']} >Admin Dashboard</NavLink></li>
                <li><NavLink to="/home" className={({isActive}) => isActive ? `${styles['nav-link']} ${styles['active']}` : styles['nav-link']} >Home</NavLink></li>
                <li><NavLink to="/profile" className={({isActive}) => isActive ? `${styles['nav-link']} ${styles['active']}` : styles['nav-link']} >Customer Profiles</NavLink>  </li>
                <li><NavLink to="/Booking" className={({isActive}) => isActive ? `${styles['nav-link']} ${styles['active']}` : styles['nav-link']} >Bookings</NavLink>  </li>
                <li><NavLink to="/Activities" className={({isActive}) => isActive ? `${styles['nav-link']} ${styles['active']}` : styles['nav-link']} >Activities</NavLink> </li>
            </ul>
            
            
        </div>
    );
}

export default SideBar;