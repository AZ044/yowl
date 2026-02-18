const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({path: "./src/.env"});

app.use(cors());
app.use(bodyParser.json());

// Load route
const auth_route = require("./routes/auth/auth");
app.use("/", auth_route);

const thread_route = require("./routes/thread/thread");
app.use("/thread", thread_route);

// Run middleware
const errorHandler = require("./middleware/error_handler");
app.use(errorHandler);

const notFound = require("./middleware/notFound");
app.use("/", notFound);

// Start API
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host, () => {
    console.log(`API run on port: ${port} and listen on: ${host}`)
})
