
const db = require("../models");
const Features = db.features;

exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Feature
  const features = new Features({
    title: req.body.title,
    description: req.body.description,
    voting: [],
    comments: [],
    published: req.body.published ? req.body.published : false
  });

  // Save features in the database
  features
    .save(features)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Features."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Features.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving features."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Features.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Feature with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Feature with id=" + id });
    });
};

exports.vote = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Features.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Feature with id " + id });
      else { 
          console.log(req.ip);
          if (data.votes.includes(req.ip)) {
            return res.status(409).send({ message: "Already voted for that feature" });
          }
          data.votes.push(req.ip);
          console.log(data);
          Features.findByIdAndUpdate(id, data, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Feature with id=${id}. Maybe Feature was not found!`
                });
              } else res.send({ message: "Feature was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Feature with id=" + id
              });
            });
        }

    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Feature with id=" + id });
    });


};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Features.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Feature with id=${id}. Maybe Feature was not found!`
        });
      } else res.send({ message: "Feature was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Feature with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Features.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Feature with id=${id}. Maybe Feature was not found!`
        });
      } else {
        res.send({
          message: "Feature was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feature with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Features.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} features were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all features."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Features.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving features."
      });
    });
};