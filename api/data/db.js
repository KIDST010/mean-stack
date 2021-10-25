
require("./games-model")
require("./users-model");
const mongoose = require("mongoose");
const dburl = process.env.DATABASE_URL + process.env.DATABASE_NAME;



mongoose.connect(dburl);
mongoose.connection.on("connected", function () {
    console.log("connected", process.env.DATABASE_NAME);

})
mongoose.connection.on("disconnected", function () {
    console.log("disconnected");

})
mongoose.connection.on("error", function () {
    console.log("connection error");

});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("exit ,close db")
        process.exit(0);
    });
});
process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
})
process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected by app termination");
        process.kill(process.pid, "SIGUSR2");
    });
});