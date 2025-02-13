const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true }, // tops, kurti, jeans
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: [String], required: true,} // Array of sizes
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
