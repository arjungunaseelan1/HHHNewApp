import React from "react";
import styles from "./ProfilePage.module.css";
import AddressForm from "../components/AddressForm";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

             //for page navigation
      const navigate = useNavigate();
        const handleSave = () => {
        navigate("/Booking"); // go to homepage
    };
    return (

  
        <>
            <div className={styles['booking-container']} >
                <h2>Customer Information</h2>

                <div className={styles['booking-grid']} >
                    <div className={styles['form-group']} >
                        <label>First Name</label>
                        <input type="text" />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Last Name</label>
                        <input type="text" />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Booking ID</label>
                        <input type="text" />
                    </div>

                    <div className={[styles['form-group'], styles['span-two']].join(' ')}>
                        <label>Email Id</label>
                        <input type="email" />
                    </div>

                    <div className={styles['form-group']} >
                        <label>Phone Number</label>
                        <input type="text" />
                    </div>

                    <div className={[styles['form-group'], styles['full-width']].join(' ')}>
                        <label>Comments/Notes</label>
                        <input type="text" />
                    </div>
                </div>
            </div>


            <AddressForm />

            <div className={styles['button-container']} >
                <button className={styles['CancelProfile']} >Cancel</button>
                <button className={styles['SaveProfile']}  onClick={handleSave} >Save</button>
            </div>
           
        </>
    );
}

export default ProfilePage;