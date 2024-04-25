import React, { useState, useEffect } from "react";
import "./ReservationList.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useAuth0 } from "@auth0/auth0-react";
// import Reservation from "./ReservationId";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    // decalare the data fectching function
    const fetchData = async () => {
      const endpoint =
        process.env.REACT_APP_ENDPOINT || "http://localhost:5001";
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${endpoint}/reservations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setReservations(data);
    };

    // call the function
    fetchData();
  }, []);
  return (
    <>
      <h1>Upcoming reservations</h1>

      <br></br>
      <ul className="grid">
        {reservations.map((Reservation) => (
          <li className="reservation-single" key={Reservation.id}>
            <h2>{Reservation.restaurantName}</h2>
            <p>{formatDate(Reservation.date)}</p>
            <Link to={`/reservations/${Reservation.id}`}>
              View Details &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReservationList;
