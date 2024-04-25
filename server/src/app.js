const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");
const ReservationModel = require("./models/ReservationModel");
const formatReservation = require("./formatReservationId");
// const formatRestaurant = require("./formatRestaurant");
const RestaurantModel = require("./models/RestaurantModel");
// const restaurant = require("./models/RestaurantModel");

app.use(cors());
app.use(express.json());

const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: "https://dev-y0a2px1sm46ajwe2.us.auth0.com/",
});

app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().min(0).required(),
      date: Joi.string().required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { body, auth } = req;
      const reservationBody = {
        userId: auth.payload.sub,
        ...body,
      };
      const reservation = new ReservationModel(reservationBody);
      await reservation.save();
      return res.status(201).send(formatReservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

app.get("/reservations", checkJwt, async (req, res) => {
  const userId = req.auth.payload.sub;
  const reservations = await ReservationModel.find({ userId });
  return res.status(200).send(reservations.map(formatReservation));
});

app.get("/reservations/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.payload.sub;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "id provided is invalid" });
  }

  const Reservation = await ReservationModel.findById(id);

  if (Reservation === null) {
    return res.status(404).send({
      error: "not found",
    });
  }
  if (userId !== Reservation.userId) {
    return res.status(403).send({
      error: "user does not have permission to access this reservation",
    });
  }
  return res.status(200).send(formatReservation(Reservation));
});

app.get("/restaurants", async (req, res) => {
  const Restaurant = await RestaurantModel.find({});
  return res.status(200).send(Restaurant);
});

app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      error: "invalid id provided",
    });
  }
  const restaurants = await RestaurantModel.findById(id);
  if (restaurants === null) {
    return res.status(404).send({
      error: "restaurant not found",
    });
  }
  return res.status(200).send(restaurants);
});

app.use(errors());

module.exports = app;
