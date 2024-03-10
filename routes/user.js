const express = require('express');
const app = express();
const { userLogin, userSignUp, getUser, updateUser, deleteUser } = require("../controller/userController");
const Auth = require('../middleware/auth');
  
app.post("/login", userLogin);
app.post("/signup", userSignUp);
app.get("/:userId", Auth, getUser);
app.put("/:userId", Auth, updateUser);
app.delete("/:userId", Auth, deleteUser);

module.exports = app