const { log } = require("console");
const fs = require("fs");
const path = require("path");
const reservations = require("../db/reservations.json");
const events = require("../db/events.json");
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
      throw new Error("firstName is required");
    }
    this.firstName = value.trim();
  }
  set lastName(value) {
    if (!value) {
      throw new Error("lastName is required");
    }
    this.lastName = value.trim();
  }
  set email(value) {
    if (!value) {
      throw new Error("email is required");
    } else if (!value.includes("@")) {
      throw new Error("Please enter a valid email");
    } else if (!value.endsWith(".it") || !value.endsWith(".com")) {
      throw new Error(`Email must ends with ".com" or ".it"`);
    }
    this.#email = value.trim();
  }
  set eventId(value) {
    if (!value) {
      throw new Error("EventID is required");
    }
    this.#eventId = +value;
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
