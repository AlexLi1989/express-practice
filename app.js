const path = require("node:path");
const express = require("express");
const app = express(); //this is our server
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/indexRouter");
const aboutRouter = require("./routes/aboutRouter");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
GET /
GET /about
GET /contact
POST /contact

GET /books
GET /books/:bookId
GET /books/:bookId/reserve
POST /books/:bookId/reserve

GET /authors
GET /authors/:authorId
*/
app.use(express.static(path.join(__dirname, "assets")));
app.use("/about", aboutRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);

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
// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
