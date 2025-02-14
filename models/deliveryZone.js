const mongoose = require("mongoose");

const DeliveryZoneSchema = new mongoose.Schema({
    pincode: { type: String, required: true, unique: true },
    location: {
        type: { type: String, enum: ["Point"], required: true, default: "Point" },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
});

// Create Geospatial Index
DeliveryZoneSchema.index({ location: "2dsphere" });

const DeliveryZone = mongoose.model("DeliveryZone", DeliveryZoneSchema);
module.exports = DeliveryZone;