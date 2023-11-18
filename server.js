const express = require("express");
/**
 * @param {express.Request} Req
 * @param {express.Response} Res
 */
const dotenv = require("dotenv");
dotenv.config();

// Imports
const eventRouter = require("./routers/eventsRouter");
const routeNotFoundMiddleware = require("./middleware/routeNotFound");
const errorsFormatterMiddlware = require("./middleware/errorsFormatter");

const app = express();
// Configuro express per leggere i dati in formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Rotte
app.use("/events", eventRouter);

// Formattare errori
app.use(errorsFormatterMiddlware);

// 404
app.use(routeNotFoundMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Server is running on port: http://localhost:" + process.env.PORT
  );
});
