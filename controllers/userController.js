const bcrypt = require("bcryptjs");
const { User } = require("../models");
const emailjs = require("emailjs-com");

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    // Send a welcome email to the user
    const templateParams = {
      to_email: user.email,
      username: user.username,
    };

    emailjs
      .send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.EMAILJS_USER
      )
      .then((response) => {
        console.log("Welcome email sent!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Failed to send welcome email.", error);
      });

    req.session.userId = user.id;
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.userId = user.id;
      res.redirect("/");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/login");
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
