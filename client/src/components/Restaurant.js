import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `http://localhost:5001/restaurants/${id}`;
      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        } else {
          throw new Error("Error fetching restaurant data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {restaurant.name}
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
