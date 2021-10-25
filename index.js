require("dotenv").config({ "path": ".env" });
const express = require("express");
const app = express();
require("./api/data/db");

const path = require("path");

// require("./api/data/dbconnection").open();
const routes = require("./api/routes/index")


if (isNaN(process.env.PORT)) {
    process.env.PORT = 6000;
}

app.set("port", process.env.PORT);

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/", routes);

const server = app.listen(app.get("port"), function () {
    console.log("listening to port", server.address().port);
})