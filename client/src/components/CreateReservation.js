import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";
import RestaurantList from "./RestaurantList";

const CreateReservation = ({ restaurantName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  // const [restaurant, setEditedRestaurant] = useState(editedRestaurant);
  const [partySize, setPartySize] = useState(0);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleRestaurantNameChange = (e) => {
  //   setEditedRestaurant(e.target.value);
  // };

  const handlePartySizeChange = (e) => {
    setPartySize(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservation = {
      partySize: partySize,
      date: selectedDate,
      restaurantName: restaurantName,
      img: RestaurantList.image,
    };
    const accessToken = await getAccessTokenSilently();
    await fetch("http://localhost:5001/reservations", {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });
    console.log(reservation);
    console.log(accessToken);
    // TODO: Add your logic to handle the form submission
    if (isAuthenticated) {
      // Perform actions when the user is authenticated
      console.log("Reservation created for:", restaurantName);
      console.log("Party size:", partySize);
      console.log("Selected date:", selectedDate);
      navigate("/CreateReservation");
    } else {
      // // Redirect to login page or display an error message
      navigate("/login");
    }
  };

  return (
    <div className="reservation-form">
      <h2>Create Reservation</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="partySize">Number of guests:</label>
          <input
            type="number"
            id="partySize"
            value={partySize}
            onChange={handlePartySizeChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            showTimeSelect
            onChange={handleDateChange}
            minDate={Date.now()}
            placeholderText="Select a date"
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateReservation;
