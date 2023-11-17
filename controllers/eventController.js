const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");

// INDEX ----------------------------------------------
function index(req, res) {
  const events = Event.read();
  const titleEvent = req.query.title;
  const dateEvent = req.query.date;

  if (titleEvent) {
    const eventsTitle = events.find(
      (event) => event.title.toLowerCase() === titleEvent.toLowerCase()
    );

    res.json({ events: eventsTitle });
  } else if (dateEvent) {
    const eventsDate = events.find((event) => event.date === dateEvent);

    res.json({ events: eventsDate });
  }

  if (events) {
    res.json({ message: "lista degli eventi:", events });
  } else {
    throw new Error("Errore nella generazione delgi eventi");
  }
}

// INDEX ----------------------------------------------
function show(req, res) {
  const events = Event.read();
  const eventId = req.params.id;
  const event = events.find((event) => event.id == eventId);
  if (event) {
    res.json({ event: event });
  } else {
    throw new Error("Evento non trovato");
  }
}

// STORE ----------------------------------------------
function store(req, res) {
  const { title, description, date, maxSeats } = req.body;
  const newEvent = new Event(title, description, date, maxSeats);

  const obj = newEvent.write();

  if (obj) {
    res.json({ message: "Evento creato con successo!", event: obj });
  } else {
    throw new Error("Errore nella creazione dell'evento");
  }
}

// UPDATE ----------------------------------------------
function update(req, res) {}

module.exports = {
  index,
  store,
  update,
  show,
};
