const formatRestaurant = (restaurant) => {
  return {
    id: restaurant._id,
    date: restaurant.date,
    restaurantName: restaurant.restaurantName,
  };
};

module.exports = formatRestaurant;
