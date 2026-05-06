import BookingDetails from "../components/BookingDetails";
import BookingForm from "../components/BookingForm";
import "../layouts/SideBar";
import styles from "./BookingPage.module.css"
import { useNavigate } from "react-router-dom";


export default function Booking(){

        //for page navigation
      const navigate = useNavigate();
        const handleSave = () => {
        navigate("/Activities"); // go to Activities Page
    };

    return ( 
        <div>
              <BookingForm />
                <BookingDetails />
              <div className={styles['button-container']} >
                <button className={styles['CancelBooking']} >Cancel</button>
                <button className={styles['SaveBooking']}  onClick={handleSave}>Save</button>
                
             </div>

             
        </div>
  
);
      
}