const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/users.js");
const Product = require("./models/product.js");
const Cart = require("./models/cart.js");
const dotenv = require("dotenv");
const session = require("express-session");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => console.log(err));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/",async(req,res) => {
    const allProducts = await Product.find({});
    // console.log(allProducts);
    res.render("home.ejs",{allProducts});
});

app.get("/carts",async(req,res) => {
    try {
        const cartItems = await Cart.find().populate("productId");

        const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.productId.price), 0);

        res.render("cart.ejs", { cartItems , totalPrice});
      } catch (err) {
        console.log(err);
      }
});


// Add Product to Cart
app.post("/add-to-cart/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const existingCartItem = await Cart.findOne({ productId });
  
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        await existingCartItem.save();
      } else {
        await Cart.create({ productId, quantity: 1 });
      }
  
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });


// Remove from Cart
app.post("/remove-from-cart/:id", async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.redirect("/carts");
    } catch (err) {
      console.log(err);
    }
  });


app.get("/users/register",(req,res)=>{
    res.render("register.ejs");
});

app.get("/users/login",(req,res)=>{
    res.render("login.ejs");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});






