const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");
const Reservation = require("../models/reservation");
const EventError = require("../exeptions/eventExeption");

function index(req, res) {
  const eventId = req.params.id;
  const reservations = Reservation.getReservations(+eventId);

  res.json({ "prenotazioni dell'evento:": reservations });
}

function store(req, res) {}

function destroy(req, res) {}

module.exports = {
  index,
  store,
  destroy,
};
