// Backend File for Express
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello You are on Home Page");
});

app.listen(PORT, () => {
  console.log(`APP is Running on PORT - ${PORT}`);
});
