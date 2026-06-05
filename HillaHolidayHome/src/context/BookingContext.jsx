import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
    // Mock application state simulating a global store / fetch layer
    const [propertyInfo] = useState({
        name: "Hilla Holiday Home",
        price: 12000, 
        currency: "₹",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    });
    
    const [bookingDates, setBookingDates] = useState({
        start: null,
        end: null
    });
    
    const [guests, setGuests] = useState(1);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);
    
    const getDaysDifference = () => {
        if (!bookingDates.start || !bookingDates.end) return 0;
        const diffTime = Math.abs(bookingDates.end - bookingDates.start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getTotalPrice = () => {
        const days = getDaysDifference();
        return days * propertyInfo.price;
    };

    return (
        <BookingContext.Provider value={{
            propertyInfo, 
            bookingDates, setBookingDates,
            guests, setGuests,
            currentCustomerId, setCurrentCustomerId,
            totalDays: getDaysDifference(),
            totalPrice: getTotalPrice()
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
