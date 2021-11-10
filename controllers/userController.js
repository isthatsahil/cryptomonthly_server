const models = require("../models/index");
const User = models.user;

exports.saveUser = (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    picture: req.body.picture,
  })
    .then((data) => {
      res.status(200).json({
        message: "User created successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error when creating user",
        error: err,
      });
    });
};
