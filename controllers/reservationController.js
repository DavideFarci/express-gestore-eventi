const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");
const Reservation = require("../models/reservation");
const ReservationError = require("../exeptions/reservationExeption");

function index(req, res) {
  const eventId = req.params.id;
  const reservations = Reservation.getReservations(+eventId);

  res.json({ "prenotazioni dell'evento:": reservations });
}

function store(req, res) {
  const eventId = req.params.id;
  const { firstName, lastName, email } = req.body;

  const reservation = new Reservation(firstName, lastName, email, eventId);
  log(reservation);
  const newReservation = reservation.addReservation(+eventId);

  if (newReservation) {
    res.json({
      message: "Prenotazione effettuata con successo",
      reservation: newReservation,
    });
  } else {
    throw new ReservationError("Errore nella prenotazione");
  }
}

function destroy(req, res) {}

module.exports = {
  index,
  store,
  destroy,
};
