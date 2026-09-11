const { Router } = require("express");

const indexRouter = Router();
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

indexRouter.get("/", (req, res) =>
  res.render("index", { links: links, users: users, message: "EJS rocks!" }),
);

module.exports = indexRouter;
