const formatReservation = (reservations) => {
  return {
    id: reservations._id,
    partySize: reservations.partySize,
    date: reservations.date,
    userId: reservations.userId,
    restaurantName: reservations.restaurantName,
  };
};

module.exports = formatReservation;
