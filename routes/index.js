const express = require('express');
const userRoute = require("./user");
const postRoute = require("./post")
const followRoute = require("./follow")
const app = express();

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/", followRoute);

module.exports = app