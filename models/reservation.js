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

  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  // GETTERS -------------------------------------------
  get firstName() {
    return this.#firstName;
  }
  get lastName() {
    return this.#lastName;
  }
  get email() {
    return this.#email;
  }

  // SETTERS -------------------------------------------
  set firstName(value) {
    if (!value) {
      throw new ReservationError("firstName is required", 404);
    }
    this.#firstName = value.trim();
  }
  set lastName(value) {
    if (!value) {
      throw new ReservationError("lastName is required", 404);
    }
    this.#lastName = value.trim();
  }
  set email(value) {
    if (!value) {
      throw new ReservationError("email is required", 404);
    } else if (!value.includes("@")) {
      throw new ReservationError("Please enter a valid email", 404);
    } else if (!value.endsWith(".it") && !value.endsWith(".com")) {
      throw new ReservationError(`Email must ends with ".com" or ".it"`, 404);
    }
    this.#email = value.trim();
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

  addReservation(eventId) {
    const reservation = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      eventId: eventId,
    };
    reservations.push(reservation);

    fs.writeFileSync(
      path.join(__dirname, "../db/reservations.json"),
      JSON.stringify(reservations, null, 2)
    );
    return reservation;
  }
}

module.exports = Reservation;
