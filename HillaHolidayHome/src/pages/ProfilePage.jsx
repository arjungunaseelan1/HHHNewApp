import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import AddressForm from "../components/AddressForm";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function ProfilePage() {

    const navigate = useNavigate();
    const { setCurrentCustomerId } = useBooking();

    // ✅ Main form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        customerType: "",
        dob: "",
        email: "",
        phone: "",
        comments: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        idProof: null
    });

    // ✅ Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Save handler (API call)
    const handleSave = async () => {
        // Validation: Check for empty required fields
        const requiredFields = [
            "firstName", "lastName", "customerType", "dob", "email", "phone",
            "street", "city", "state", "country", "zipcode"
        ];

        const missingFields = requiredFields.filter(field => !formData[field] || String(formData[field]).trim() === "");

        if (missingFields.length > 0) {
            alert("Please fill in all required fields before saving.");
            return; // Prevent hitting the db
        }

        try {
            const formDataToSend = new FormData();

            // Append all fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await fetch("http://localhost:5000/api/customers", {
                method: "POST",
                body: formDataToSend
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error saving profile");
            }
            
            // ✅ Save the auto-generated database Customer ID into Context globally
            if (data.Customer_Number || data.customerId || data.id) {
                setCurrentCustomerId(data.Customer_Number || data.customerId || data.id);
            }

            alert("Profile saved successfully ✅");
            navigate("/home");

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <>
            {/* ================= CUSTOMER INFO ================= */}
            <div className={styles['booking-container']} >
                <h2>Customer Information</h2>

                <div className={styles['booking-grid']} >

                    <div className={styles['form-group']} >
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Customer Type</label>
                        <input
                            type="text"
                            name="customerType"
                            value={formData.customerType}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Email Id</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={[styles['form-group'], styles['full-width']].join(' ')}>
                        <label>Comments / Notes</label>
                        <input
                            type="text"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                        />
                    </div>

                </div>
            </div>

            {/* ================= ADDRESS FORM ================= */}
            <AddressForm setFormData={setFormData} />

            {/* ================= BUTTONS ================= */}
            <div className={styles['button-container']} >
                <button className={styles['CancelProfile']} onClick={() => navigate("/home")}>
                    Cancel
                </button>

                <button className={styles['SaveProfile']} onClick={handleSave}>
                    Save
                </button>
            </div>
        </>
    );
}

export default ProfilePage;