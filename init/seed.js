const mongoose = require("mongoose");
const DeliveryZone = require("../models/deliveryZone.js");

MONGO_URL = "mongodb+srv://harishmchoudhary12:harish12@fashgo.osyl5.mongodb.net/FashGo?retryWrites=true&w=majority&appName=FashGo";

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        await DeliveryZone.deleteMany({});

        await DeliveryZone.insertMany([
            { pincode: "110001", location: { type: "Point", coordinates: [77.216721, 28.644800] } }, // Delhi
            { pincode: "400001", location: { type: "Point", coordinates: [72.877656, 19.075983] } }  // Mumbai
        ]);

        console.log("Sample data added!");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));