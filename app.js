// Backend File for Express
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Setting Up Template Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("index");
});

app.get("/detail/:id", (req, res) => {
  res.render("index");
});

app.get("/collections", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`APP is Running on PORT - ${PORT}`);
});
