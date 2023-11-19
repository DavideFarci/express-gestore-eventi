const { log } = require("console");
const fs = require("fs");
const path = require("path");
const reservations = require("../db/reservations.json");
const events = require("../db/events.json");
const ReservationError = require("../exeptions/reservationExeption");

class Reservation {
  #firstName;
  #lastName;
  #email;
  #eventId;

  constructor(firstName, lastName, email, eventId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.eventId = eventId;
  }

  // GETTERS -------------------------------------------
  get firstName() {
    return this.#firstName;
  }
  get lastName() {
    return this.#lastName;
  }
  get email() {
    return this.email;
  }
  get eventId() {
    return this.eventId;
  }

  // SETTERS -------------------------------------------
  set firstName(value) {
    if (!value) {
      throw new ReservationError("firstName is required", 400);
    }
    this.firstName = value.trim();
  }
  set lastName(value) {
    if (!value) {
      throw new ReservationError("lastName is required", 400);
    }
    this.lastName = value.trim();
  }
  set email(value) {
    if (!value) {
      throw new ReservationError("email is required", 400);
    } else if (!value.includes("@")) {
      throw new ReservationError("Please enter a valid email", 400);
    } else if (!value.endsWith(".it") || !value.endsWith(".com")) {
      throw new ReservationError(`Email must ends with ".com" or ".it"`, 400);
    }
    this.#email = value.trim();
  }
  set eventId(value) {
    if (!value) {
      throw new ReservationError("EventID is required", 400);
    }
    this.#eventId = +value;
  }

  // FUNCTIONS -----------------------------------------
  static getReservations(eventId) {
    const event = events.find((event) => event.id === eventId);
    if (!event) {
      throw new ReservationError(`Evento con ID ${eventId} non trovato`, 400);
    }
    const eventReservations = reservations.filter(
      (reservation) => reservation.eventId === eventId
    );

    return eventReservations;
  }
}

module.exports = Reservation;
