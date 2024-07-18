const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./models/index");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const emailjs = require("emailjs-com");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// EmailJS setup (example usage in a route or controller)
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

// Example function to send an email
const sendEmail = (to, subject, content) => {
  const templateParams = {
    to_email: to,
    subject: subject,
    content: content,
  };

  emailjs
    .send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    )
    .then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};
