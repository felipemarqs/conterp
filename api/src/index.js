require("dotenv").config();
const express = require("express");
const cors = require("../src/app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandler");
const port = process.env.PORT;

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`😜 Server is listening on: http://localhost:${port}.`);
});
