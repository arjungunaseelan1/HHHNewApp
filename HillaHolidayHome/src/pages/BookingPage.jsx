import { useState, useEffect } from "react";
import BookingDetails from "../components/BookingDetails";
import BookingForm from "../components/BookingForm";
import "../layouts/SideBar";
import styles from "./BookingPage.module.css"
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function Booking() {
  //for page navigation
  const navigate = useNavigate();
  const { bookingDates, guests, totalDays, totalPrice, propertyInfo, currentCustomerId } = useBooking();

  // State to hold data for the booking form
  const [formData, setFormData] = useState({
    bookingId: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    comments: "",
    customerId: ""
  });

  // Retrieve data from DB (mocked API call) to pre-fill the form based on Admin.Customers table structure
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // NOTE: Replace the endpoint with your actual endpoint to get current customer
        // Currently fetching all data from db that matches Admin.Customers fields
        const response = await fetch("https://hhhnewapp-1.onrender.com/api/customers");
        if (response.ok) {
          const data = await response.json();

          // The API returns all customers; extract the latest one (last in the array)
          const latestCustomer = (Array.isArray(data) && data.length > 0)
            ? data[data.length - 1]
            : data;
          // Convert "DD-MM-YYYY" to "YYYY-MM-DD" for HTML date input
          const parseDateStr = (dateStr) => {
            if (!dateStr) return "";
            const str = String(dateStr);
            if (str.includes("-")) {
              const parts = str.split("-");
              // Check if format is DD-MM-YYYY
              if (parts.length === 3 && parts[2].length === 4) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
              }
            }
            return str.split("T")[0];
          };

          setFormData(prev => ({
            ...prev,
            firstName: latestCustomer.firstName || latestCustomer.FirstName || "",
            lastName: latestCustomer.lastName || latestCustomer.LastName || "",
            email: latestCustomer.email || latestCustomer.EmailId || latestCustomer.Email || "",
            phone: latestCustomer.phone || latestCustomer.PhoneNumber || latestCustomer.Phone || "",
            comments: latestCustomer.comments || latestCustomer.CommentsNotes || "",
            dob: parseDateStr(latestCustomer.dob || latestCustomer.DateOfBirth),
            // Still parse local fallback just incase
            customerId: latestCustomer.Customer_Number || latestCustomer.customerId || latestCustomer.id || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  // Handle updates to the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save Booking into the database via stored procedure [dbo].[InsertBooking]
  const handleSave = async () => {
    try {
      // Prepare exact payload structure
      const payload = {
        customerNumber: currentCustomerId || formData.customerId,
        numberOfGuests: guests,
        checkIn: bookingDates.start,
        checkOut: bookingDates.end
      };

      console.log("Payload:", payload);

      // Call the local backend API which should execute [dbo].[InsertBooking]
      const response = await fetch("https://hhhnewapp-1.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Booking saved successfully!");
        navigate("/Activities"); // go to Activities Page
      } else {
        throw new Error("Failed to save booking");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Error saving booking data to db.");
    }
  };

  return (
    <div>
      <BookingForm formData={formData} onChange={handleChange} />
      <BookingDetails />
      <div className={styles['button-container']} >
        <button className={styles['CancelBooking']} onClick={() => navigate("/home")}>Cancel</button>
        <button className={styles['SaveBooking']} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}