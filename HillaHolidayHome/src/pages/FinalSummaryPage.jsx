import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import styles from "./FinalSummaryPage.module.css";

function FinalSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDates, totalDays, propertyInfo } = useBooking();
    
    // Retrieve activities from router state, default to empty array
    const activities = location.state?.activities || [];
    
    // Calculate activities total
    const activitiesTotal = activities.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    // State for inputs
    const [rooms, setRooms] = useState(1);
    const [pricePerRoom, setPricePerRoom] = useState(propertyInfo?.price || 12000);
    const [dbGuests, setDbGuests] = useState("Loading...");
    const [dbDates, setDbDates] = useState({ start: null, end: null });
    const [customerInfo, setCustomerInfo] = useState({ name: "Loading...", phone: "Loading...", email: "Loading..." });
    const [bookingId, setBookingId] = useState("");
    const [customerId, setCustomerId] = useState("");

    // Fetch guests from the DB (previous GET method style)
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/bookings");
                if (response.ok) {
                    const data = await response.json();
                    const latestBooking = (Array.isArray(data) && data.length > 0)
                        ? data[data.length - 1]
                        : data;
                    
                    setDbGuests(latestBooking.No_Of_Guest || latestBooking.numberOfGuests || "N/A");
                    setBookingId(latestBooking.Booking_Number || latestBooking.bookingId || latestBooking.id || "");
                    setDbDates({
                        start: latestBooking.Check_In ? new Date(latestBooking.Check_In).toDateString() : null,
                        end: latestBooking.Check_Out ? new Date(latestBooking.Check_Out).toDateString() : null
                    });
                }
            } catch (error) {
                console.error("Error fetching booking data:", error);
                setDbGuests("Error");
            }
        };

        const fetchCustomerData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/customers");
                if (response.ok) {
                    const data = await response.json();
                    const latestCustomer = (Array.isArray(data) && data.length > 0)
                        ? data[data.length - 1]
                        : data;

                    const firstName = latestCustomer.firstName || latestCustomer.FirstName || "";
                    const lastName = latestCustomer.lastName || latestCustomer.LastName || "";
                    setCustomerId(latestCustomer.Customer_Number || latestCustomer.customerId || latestCustomer.id || "");
                    
                    setCustomerInfo({
                        name: `${firstName} ${lastName}`.trim() || "N/A",
                        phone: latestCustomer.phone || latestCustomer.PhoneNumber || latestCustomer.Phone || "N/A",
                        email: latestCustomer.email || latestCustomer.EmailId || latestCustomer.Email || "N/A"
                    });
                }
            } catch (error) {
                console.error("Error fetching customer data:", error);
                setCustomerInfo({ name: "Error", phone: "Error", email: "Error" });
            }
        };

        fetchBookingData();
        fetchCustomerData();
    }, []);

    // Auto-calculated fields
    const validTotalDays = totalDays > 0 ? totalDays : 1;
    const roomCost = rooms * pricePerRoom * validTotalDays;
    const subTotal = roomCost + activitiesTotal;
    const gst = subTotal * 0.1;
    const grandTotal = subTotal + gst;

    const displayStart = bookingDates?.start ? new Date(bookingDates.start).toDateString() : dbDates.start || "N/A";
    const displayEnd = bookingDates?.end ? new Date(bookingDates.end).toDateString() : dbDates.end || "N/A";

    const handleConfirm = () => {
        const activeActivities = activities.filter(a => a.count > 0);
        const activityNames = activeActivities.map(a => a.name).join(", ") || "None";
        const activityCounts = activeActivities.reduce((sum, a) => sum + a.count, 0);

        navigate("/payment", {
            state: {
                Booking_Number: bookingId,
                Customer_Number: customerId,
                check_in_date: displayStart,
                check_out_date: displayEnd,
                activity_name: activityNames,
                activity_Count: activityCounts,
                activity_bill: activitiesTotal,
                total_amount: subTotal,
                tax_amount: gst,
                final_amount: grandTotal
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Final Booking Summary</h2>

                <div className={styles.section}>
                    <h3>Customer Details</h3>
                    <div className={styles.row}>
                        <span>Name:</span>
                        <strong>{customerInfo.name}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Phone:</span>
                        <strong>{customerInfo.phone}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Email:</span>
                        <strong>{customerInfo.email}</strong>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Dates & Duration</h3>
                    <div className={styles.row}>
                        <span>Check-in:</span>
                        <strong>{displayStart}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Check-out:</span>
                        <strong>{displayEnd}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Total Days:</span>
                        <strong>{validTotalDays}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Total Guests:</span>
                        <strong>{dbGuests}</strong>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Room Details</h3>
                    <div className={styles.inputGroup}>
                        <label>Number of Rooms</label>
                        <input 
                            type="number" 
                            min="1" 
                            value={rooms} 
                            onChange={(e) => setRooms(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Price per Room per day (₹)</label>
                        <input 
                            type="number" 
                            min="0" 
                            value={pricePerRoom} 
                            onChange={(e) => setPricePerRoom(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                    </div>
                    <div className={styles.rowTotal}>
                        <span>Room Cost:</span>
                        <strong>₹{roomCost}</strong>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Activities Chosen</h3>
                    {activities.filter(a => a.count > 0).length > 0 ? (
                        activities.map((item, i) => (
                            item.count > 0 && (
                                <div className={styles.row} key={i}>
                                    <span>{item.name} × {item.count}</span>
                                    <span>₹{item.price * item.count}</span>
                                </div>
                            )
                        ))
                    ) : (
                        <div className={styles.row}>
                            <span>No activities selected</span>
                            <span>₹0</span>
                        </div>
                    )}
                    <div className={styles.rowTotal}>
                        <span>Activities Total:</span>
                        <strong>₹{activitiesTotal}</strong>
                    </div>
                </div>

                <div className={styles.grandTotalSection}>
                    <div className={styles.row}>
                        <span>Sub Total:</span>
                        <span>₹{subTotal}</span>
                    </div>
                    <div className={styles.row}>
                        <span>GST (10%):</span>
                        <span>₹{gst}</span>
                    </div>
                    <div className={styles.rowTotalGrand}>
                        <span>Grand Total:</span>
                        <span>₹{grandTotal}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
                    <button className={styles.confirmBtn} onClick={handleConfirm}>Confirm Booking</button>
                </div>
            </div>
        </div>
    );
}

export default FinalSummaryPage;
