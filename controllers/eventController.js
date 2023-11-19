const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");
const EventError = require("../exeptions/eventExeption");

// INDEX ----------------------------------------------
function index(req, res) {
  const { title, date } = req.query;
  let events = Event.read().filter(
    (event) =>
      (!title || event.title.toLowerCase().includes(title.toLowerCase())) &&
      (!date || event.date === date)
  );

  if (events.length) {
    res.json({ message: "lista degli eventi:", events });
  } else {
    throw new EventError("Si è verificato un problema, riprova!", 500);
  }
}

// SHOW ----------------------------------------------
function show(req, res) {
  const events = Event.read();
  const eventId = req.params.id;
  const event = events.find((event) => event.id == eventId);
  if (event) {
    res.json({ event: event });
  } else {
    throw new EventError("Evento non trovato", 404);
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
    throw new EventError("Errore nella creazione dell'evento", 400);
  }
}

// UPDATE ----------------------------------------------
function update(req, res) {
  const events = Event.read();
  const eventId = req.params.id;
  const { title, description, date, maxSeats } = req.body;

  const eventToUpdate = events.find((event) => event.id == eventId);
  if (!eventToUpdate) {
    throw new EventError("Evento non trovato", 404);
  }

  if (title) {
    eventToUpdate.title = title;
  }
  if (description) {
    eventToUpdate.description = description;
  }
  if (date) {
    eventToUpdate.date = date;
  }
  if (maxSeats) {
    eventToUpdate.maxSeats = maxSeats;
  }

  const updatedEvent = Event.update(events);
  if (updatedEvent) {
    res.json({
      messaggio: "Evento creato con successo",
      newEvent: eventToUpdate,
    });
  } else {
    throw new EventError("Errore nell'aggiornamento dell'evento", 400);
  }
}

module.exports = {
  index,
  store,
  update,
  show,
};
