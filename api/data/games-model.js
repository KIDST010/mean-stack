const mongoose = require("mongoose");
const publisher = new mongoose.Schema({
    type: String,
    location: {
        type: {
            type: String
        },
        coordinates: {//stores cordinates longitude(E/W) latitue(N/S)
            type: [Number],
            index: "2edsphere"
        }
    }
})
const reviews = new mongoose.Schema({
    name: String,
    reviews: String,
    date: {
        type: Date,
        "default": Date.now()
    }

})
const gameSchema = new mongoose.Schema({
    title: {
        type: String
    },
    year: Number,
    minPlayers: Number,
    maxPlayers: Number,
    price: Number,
    minAge: Number,
    designers: String,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    publisher: publisher,
    reviews: [reviews]

});
//compiling the model
mongoose.model("Game", gameSchema, "games");
