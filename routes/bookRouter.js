const { Router } = require("express");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId}`);
});
bookRouter.get("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`All reserve on Book ID: ${bookId}`);
});
bookRouter.post("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`You made a reserve on Book ID: ${bookId}`);
});

module.exports = bookRouter;
