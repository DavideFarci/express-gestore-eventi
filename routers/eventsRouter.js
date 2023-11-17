const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// INDEX
router.get("/", eventController.index);

// SHOW
router.get("/:id", eventController.show);

// STORE
router.post("/", eventController.store);

// UPDATE
router.put("/:event", eventController.update);

module.exports = router;
