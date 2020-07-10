const express = require("express");
const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(express.json(), morgan("dev"), cors());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>API server is running</h2>`);
});

module.exports = server;
