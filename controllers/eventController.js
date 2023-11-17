const { log } = require("console");
const fs = require("fs");
const path = require("path");

const Event = require("../models/event");

// INDEX ----------------------------------------------
function index(req, res) {
  console.log(Event.read());
}

// STORE ----------------------------------------------
function store(req, res) {
  log(Event.write());
}

// UPDATE ----------------------------------------------
function update(req, res) {}

module.exports = {
  index,
  store,
  update,
};
