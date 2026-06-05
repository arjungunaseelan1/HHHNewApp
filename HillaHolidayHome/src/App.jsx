import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import ActivityPage from "./pages/ActivityPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotificationsPage from "./pages/NotificationsPage";
import FinalSummaryPage from "./pages/FinalSummaryPage";
import PaymentPage from "./pages/PaymentPage";
import { BookingProvider } from "./context/BookingContext";

function App() {
    return (
        <BookingProvider>
            <BrowserRouter>
                <Routes>
                    {/* No sidebar */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Sidebar applied globally */}
                    <Route element={<Layout />}>
                        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/Booking" element={<BookingPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/Activities" element={<ActivityPage />} />
                        <Route path="/final-summary" element={<FinalSummaryPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </BookingProvider>
    );
}

export default App;