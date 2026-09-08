const express = require("express");
const app = express(); //This is our server.

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 5173; //Usually, the port number would come from an environment variable with a fallback value in case the environment variable does not exist.
const server = app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
server.on("error", (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  console.error("server failed to start, error : ", error.message);
  throw error;
});
