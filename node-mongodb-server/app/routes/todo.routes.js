module.exports = app => {
  const todo = require("../controllers/todo.controller.js");

  var router = require("express").Router();


  router.post("/", todo.create);

  router.get("/", todo.findAll);

  router.get("/mark", todo.findAllMark);

  router.get("/:id", todo.findOne);

  router.put("/:id", todo.update);

  router.delete("/:id", todo.delete);

  router.delete("/", todo.deleteAll);

  app.use("/api/todos", router);
};
