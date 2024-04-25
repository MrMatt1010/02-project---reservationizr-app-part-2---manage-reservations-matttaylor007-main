import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./RestaurantList.css";

const RestaurantList = ({ id }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await fetch(`http://localhost:5001/restaurants`);
      const data = await response.json();
      console.log(data);
      setRestaurants(data);
      setIsLoading(false);
    };
    getRestaurants();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="restaurant-list-container">
      <h1>Restaurants</h1>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => {
          console.log(restaurant);
          return (
            <li className="restaurant-item" key={restaurant.id}>
              <div className="restaurant-image-container">
                <img
                  className="imageRestaurant"
                  src={restaurant.image}
                  alt=""
                />
              </div>
              <div className="restaurant-content">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.description}</p>
              </div>
              <div className="reserve-button-container">
                <Link className="button" to={`/restaurants/${restaurant.id}`}>
                  Reserve now &rarr;
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantList;
