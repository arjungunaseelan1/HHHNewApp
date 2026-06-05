import React from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import CalendarComponent from "../components/CalendarComponent";

function AdminDashboard() {

    const navigate = useNavigate();

    const data = [
        { name: "Jan", 2020: 40, 2021: 80, 2022: 60 },
        { name: "Feb", 2020: 60, 2021: 50, 2022: 70 },
        { name: "Mar", 2020: 30, 2021: 90, 2022: 40 },
    ];

    return (
        <div className={styles['dashboard-container']} >

            <div className={styles['dashboard-header']} >
                <h1>Admin Dashboard</h1>
                <div>
                    <span style={{ cursor: 'pointer', margin: '0 10px' }}>🔍</span>
                    <span 
                        style={{ cursor: 'pointer', margin: '0 10px' }} 
                        onClick={() => navigate('/notifications')}
                        title="View Notifications"
                    >
                        🔔
                    </span>
                    <span style={{ cursor: 'pointer', margin: '0 10px' }}>👤</span>
                </div>
            </div>

            <div className={styles['stats-container']} >
                <StatsCard value="25" label="Total Bookings This Month" />
                <StatsCard value="25" label="Total Revenue Generated" />
                <StatsCard value="25" label="Total Expenses" />
            </div>

            <div className={styles['charts-container']} >
                <BarChartComponent data={data} />
            </div>

            <div className={styles['bottom-section']} >
                <LineChartComponent data={data} />
                <CalendarComponent />
            </div>

        </div>
    );
}

export default AdminDashboard;