const express = require('express');
const app = express();
const { createPost, getPost, updatePost, deletePost, getFeed } = require("../controller/postController");
const Auth = require('../middleware/auth');

app.get("/view",Auth, getPost);
app.post("/create", Auth, createPost);
app.put("/:postId", Auth, updatePost);
app.delete("/:postId", Auth, deletePost);
app.get("/feed",Auth,getFeed);

module.exports = app