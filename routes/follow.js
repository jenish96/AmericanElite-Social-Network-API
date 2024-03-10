const express = require('express');
const app = express();
const { followUser, unfollowUser, getFollowing, getFollowers } = require("../controller/followController");
const Auth = require('../middleware/auth');

app.post("/follow/:userId", Auth, followUser);
app.post("/unfollow/:userId", Auth, unfollowUser);
app.get("/following", Auth, getFollowing);
app.get("/followers", Auth, getFollowers);


module.exports = app