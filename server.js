const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",(req, res) => {

    res.json({ message:"welcome to bezkoder application."});
});

app.listen(3000, ()=> {
    console.log("server ejecutandose en el puerto 3000.");
});