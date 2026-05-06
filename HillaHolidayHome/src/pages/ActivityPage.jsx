import React, { useState } from "react";
import styles from "./ActivityPage.module.css";
import ActivityCard from "../components/ActivityCard";
import BookingSummary from "../components/BookingSummary";
import ActivityForm from "../components/ActivityForm";

function ActivityPage() {
    const [activities, setActivities] = useState([
    {
        name: "Music",
        price: 500,
        count: 0,
        type: "Max 15 people",
        image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
    },
    {
        name: "Trekking",
        price: 500,
        count: 0,
        type: "Per person",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    {
        name: "Campfire",
        price: 1500,
        count: 0,
        type: "Per night",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    },
    {
        name: "Cooking",
        price: 500,
        count: 0,
        type: "Based on count",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    },
    {
        name: "Jeep Safari",
        price: 3500,
        count: 0,
        type: "Max 8 people",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
    }
]);

    const updateCount = (index, change) => {
        const updated = [...activities];
        updated[index].count = Math.max(0, updated[index].count + change);
        setActivities(updated);
    };

    return (
        <div className={styles['activity-container']} >
            {/* <h2>Booking Information</h2> */}
             <ActivityForm />

            <div className={styles['activity-layout']} >
                
                {/* LEFT SIDE */}
                <div className={styles['activity-grid']} >
                    {activities.map((item, index) => (
                        <ActivityCard
                            key={index}
                            item={item}
                            onChange={(val) => updateCount(index, val)}
                        />
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <BookingSummary activities={activities} />
            </div>
        </div>
    );
}

export default ActivityPage;