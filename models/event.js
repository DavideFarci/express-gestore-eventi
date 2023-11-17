// const arrEvents = require("../db/events.json");
const fs = require("fs");
const path = require("path");

class Event {
  #id;
  #title;
  #description;
  #date;
  #maxSeats;

  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  // GETTERS -------------------------------------------
  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get date() {
    return this.#date;
  }
  get maxSeats() {
    return this.#maxSeats;
  }

  // SETTERS -------------------------------------------
  set id(value) {
    if (!value) {
      throw new Error("id is required");
    }

    this.#id = +value;
  }

  set title(value) {
    if (!value || !value.trim()) {
      throw new Error("Title is required");
    }

    this.#title = value.toLowerCase();
  }

  set description(value) {
    if (!value) {
      throw new Error("Description is required");
    }

    this.#description = value;
  }

  /**
   * @param {string} value
   */
  set date(value) {
    if (!value) {
      throw new Error("date is required");
    }

    this.#date = value;
  }

  set maxSeats(value) {
    if (!value) {
      throw new Error("maxSeats is required");
    }

    this.#maxSeats = +value;
  }

  // FUNCTIONS -------------------------------------------
  static read() {
    const data = fs.readFileSync(
      path.join(__dirname, "../db/events.json"),
      "utf8"
    );
    return JSON.parse(data);
  }

  static write() {
    // leggo il file degli eventi che mi restituisce un array
    const events = Event.read();

    // Recupero gli id degli eventi
    /**
     * @type {number[]}
     */
    let idList = events.map((event) => event.id);
    // Riordino gli ig
    idList.sort((a, b) => b - a);

    // Inserisco il nuovo evento nell'array generando un nuovo id
    events.push({
      id: idList[0] + 1,
      title: this.title,
      description: this.description,
      date: this.date,
      maxSeats: this.maxSeats,
    });

    // Converto l'array in json e scrivo il file del db
    fs.writeFileSync(
      path.join(__dirname, "../db/events.json"),
      JSON.stringify(events, null, 2)
    );
  }
}

module.exports = Event;
