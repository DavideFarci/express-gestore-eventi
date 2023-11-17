const express = require("express");
/**
 * @param {express.Request} Req
 * @param {express.Response} Res
 */
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Rotte

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Server is running on port: http://localhost:" + process.env.PORT
  );
});
