import React from "react";
import styles from "../pages/AdminDashboard.module.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function LineChartComponent({ data }) {
    return (
        <div className={styles['chart-box']} >
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="2020" />
                    <Line type="monotone" dataKey="2021" />
                    <Line type="monotone" dataKey="2022" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;