// const arrEvents = require("../db/events.json");
const fs = require("fs");
const path = require("path");

class Event {
  #title;
  #description;
  #date;
  #maxSeats;

  constructor(title, description, date, maxSeats) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  // GETTERS -------------------------------------------
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

  /**
   * @param {number} value
   */
  set maxSeats(value) {
    console.log(value);
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

  write() {
    console.log(this.title);
    // leggo il file degli eventi che mi restituisce un array
    const events = Event.read();

    // Recupero gli id degli eventi
    /**
     * @type {number[]}
     */
    let idList = events.map((event) => event.id);
    // Riordino gli id
    idList.sort((a, b) => b - a);

    // Inserisco il nuovo evento nell'array generando un nuovo id
    const event = {
      id: idList[0] + 1,
      title: this.title,
      description: this.description,
      date: this.date,
      maxSeats: this.maxSeats,
    };
    events.push(event);

    // Converto l'array in json e scrivo il file del db
    fs.writeFileSync(
      path.join(__dirname, "../db/events.json"),
      JSON.stringify(events, null, 2)
    );
    return event;
  }

  static update(events) {
    const filePath = path.join(__dirname, "../db/events.json");

    try {
      // Converte l'array di eventi in formato JSON
      const eventsJson = JSON.stringify(events, null, 2);

      // Scrive i dati nel file
      fs.writeFileSync(filePath, eventsJson, "utf8");

      return true; // Operazione di scrittura avvenuta con successo
    } catch (error) {
      console.error("Errore nella scrittura del file:", error);
      return false; // Operazione di scrittura fallita
    }
  }
}

module.exports = Event;
