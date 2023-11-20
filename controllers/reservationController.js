const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");
const Reservation = require("../models/reservation");
const ReservationError = require("../exeptions/reservationExeption");

function index(req, res) {
  const eventId = +req.params.id;
  const reservations = Reservation.getReservations(eventId);

  res.json({ "prenotazioni dell'evento:": reservations });
}

function store(req, res) {
  const eventId = +req.params.id;
  const { firstName, lastName, email } = req.body;

  // Chiamo tutti gli evnti e cerco l'evento interessato
  const events = Event.read();
  const event = events.find((event) => event.id == eventId);

  // Cerco le prenotaz. con l'id dell'evento richiesto
  const reservationsList = Reservation.getReservations(eventId);
  if (reservationsList.length >= event.maxSeats) {
    throw new ReservationError("Evento sold out");
  }

  const reservation = new Reservation(firstName, lastName, email, eventId);
  const newReservation = reservation.addReservation(eventId);

  if (newReservation) {
    res.json({
      message: "Prenotazione effettuata con successo",
      reservation: newReservation,
    });
  } else {
    throw new ReservationError("Errore nella prenotazione", 400);
  }
}

function destroy(req, res) {}

module.exports = {
  index,
  store,
  destroy,
};
