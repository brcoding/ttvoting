module.exports = app => {
  const features = require("../controllers/features.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", features.create);

  // Retrieve all features
  router.get("/", features.findAll);

  // Retrieve all published features
  router.get("/published", features.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", features.findOne);

  // Update a Tutorial with id
  router.put("/:id", features.update);

  // Update a Tutorial with id
  router.put("/vote/:id", features.vote);

  // Delete a Tutorial with id
  router.delete("/:id", features.delete);

  // Create a new Tutorial
  router.delete("/", features.deleteAll);

  app.use('/api/features', router);
};