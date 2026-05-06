import React from "react";
import styles from "../pages/AdminDashboard.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function BarChartComponent({ data }) {
    return (
        <div className={styles['chart-box']} >
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="2020" />
                    <Bar dataKey="2021" />
                    <Bar dataKey="2022" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;