const { log } = require("console");
const fs = require("fs");
const path = require("path");
const reservations = require("../db/reservations.json");
const events = require("../db/events.json");
class Reservation {
  firstName;
  lastName;
  email;
  eventId;

  constructor(firstName, lastName, email, eventId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.eventId = eventId;
  }

  // FUNCTIONS -----------------------------------------
  static getReservations(eventId) {
    const event = events.find((event) => event.id === eventId);
    if (!event) {
      throw new Error(`Evento con ID ${eventId} non trovato`);
    }
    const eventReservations = reservations.filter(
      (reservation) => reservation.eventId === eventId
    );

    return eventReservations;
  }
}

module.exports = Reservation;
