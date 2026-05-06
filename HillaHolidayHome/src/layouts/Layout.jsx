import React from "react";
import SideBar from "./SideBar";
import TopBanner from "./TopBanner";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
    const location = useLocation();

    // 🎯 Define banner content per route
    const bannerContent = {
        "/home": {
            title: "Welcome to Hilla Holiday",
            subtitle: "Find your perfect getaway",
        },
        "/bookings": {
            title: "Your Bookings",
            subtitle: "Manage your reservations",
        },
         "/profile": {
            title: "Customer Profile",
            subtitle: "Manage customer profiles",
        },
    };

    // Default fallback
    const current = bannerContent[location.pathname] || {
        title: "Hilla Holiday Home",
        subtitle: "Enjoy your stay",
    };

    return (
        <div className={styles['app-layout']} >
            <SideBar />

            <div className={styles['main-content']} >
                {/* ✅ Top Banner */}
                <TopBanner 
                    title={current.title} 
                    subtitle={current.subtitle} 
                />

                {/* ✅ Page Content */}
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;