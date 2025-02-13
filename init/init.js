const mongoose = require('mongoose');
const Product = require('../models/product.js');
const sampleProducts = require("./db.js")


let MONGO_URL = "mongodb+srv://harishmchoudhary12:harish12@fashgo.osyl5.mongodb.net/FashGo?retryWrites=true&w=majority&appName=FashGo";

// Connect to MongoDB
mongoose.connect(MONGO_URL).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));


const insertProducts = async () => {
    try {
        let productsToInsert = [];

        // Extract and restructure the product data
        sampleProducts.forEach(categoryObj => {
            const categoryName = Object.keys(categoryObj)[0]; // Get category name (e.g., 'tops', 'kurti', 'jeans')
            const products = categoryObj[categoryName]; // Extract products array

            // Map each product and add the category field
            products.forEach(product => {
                productsToInsert.push({ category: categoryName, ...product });
            });
        });

        // Insert products into MongoDB
        await Product.insertMany(productsToInsert);
        console.log('✅ Products Inserted Successfully!');
        mongoose.connection.close(); // Close connection after insertion
    } catch (error) {
        console.error('❌ Error Inserting Products:', error);
    }
};

// Run the Insert Function
insertProducts();