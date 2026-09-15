const { Router } = require("express");
const { query } = require("express-validator");
const usersRouter = Router();
const usersController = require("../controllers/usersController");

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);
usersRouter.get(
  "/search",
  //sanitize search query
  [query("name").trim().escape(), query("email").trim().escape()],
  usersController.usersSearchGet,
);

module.exports = usersRouter;
