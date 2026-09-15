const { Router } = require("express");

const indexRouter = Router();
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/books", text: "Books" },
  { href: "/authors", text: "Authors" },
  { href: "/create", text: "Create User" },
];

const users = ["Rose", "Cake", "Biff"];

indexRouter.get("/", (req, res) =>
  res.render("index", { links: links, users: users, message: "EJS rocks!" }),
);

module.exports = indexRouter;
