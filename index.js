const express = require('express');
const routes = require("./routes/index");
const rateLimit = require('express-rate-limit');
require("./config/db");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests 
});

app.use(express.json());
app.use(limiter);

app.use("/api/v1/", routes);

app.get("/",async(req,res)=>{
      res.send("Welcome to Social Network API");  
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
