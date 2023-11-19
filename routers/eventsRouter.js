const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const reservationController = require("../controllers/reservationController");

// EVENTS ---------------------------------------

// INDEX
router.get("/", eventController.index);

// SHOW
router.get("/:id", eventController.show);

// STORE
router.post("/", eventController.store);

// UPDATE
router.put("/:id", eventController.update);

// RESERVATION ---------------------------------------

// INDEX
router.get("/:id/reservations", reservationController.index);

// STORE
router.post("/:id/reservations", reservationController.store);

// DESTROY
router.delete("/:id/reservations", reservationController.destroy);

module.exports = router;
