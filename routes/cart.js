const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');


router.get("/carts",async(req,res) => {
    try {
        const cartItems = await Cart.find().populate("productId");

         const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.productId.price) * item.quantity), 0);

        res.render("cart.ejs", { cartItems , totalPrice});
      } catch (err) {
        console.log(err);
      }
});


// Remove from Cart
router.post("/remove-from-cart/:id", async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.redirect("/carts");
    } catch (err) {
      console.log(err);
    }
  });


// Update quantity in cart using MongoDB update query
router.post("/update-cart/:id", async (req, res) => {
    try {
        const { action } = req.body; // "increase" or "decrease"
        
        const updateQuery = action === "increase" ? { $inc: { quantity: 1 } } : { $inc: { quantity: -1 } };

        // Ensure quantity never goes below 1
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) return res.redirect("/carts");

        if (action === "decrease" && cartItem.quantity <= 1) {
            return res.redirect("/carts");
        }

        await Cart.findByIdAndUpdate(req.params.id, updateQuery);

        res.redirect("/carts");
    } catch (err) {
        console.log(err);
        res.redirect("/carts");
    }
});


module.exports = router;