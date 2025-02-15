const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/users.js");
const Product = require("./models/product.js");
const Cart = require("./models/cart.js");
const DeliveryZone = require("./models/deliveryZone.js")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const userMiddleware = require("./middleware/userMiddleware");
const authMiddleware = require("./middleware/authMiddleware.js");
const profileRoutes = require("./routes/profileRoutes");
const cartRoutes = require('./routes/cart');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(userMiddleware);
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/", async(req,res) => {
    const allProducts = await Product.find({});
    // console.log(allProducts);
    res.render("home.ejs",{allProducts});
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



  app.post("/check-delivery", async (req, res) => {
    const { pincode } = req.body;

    try {
        const zone = await DeliveryZone.findOne({ pincode });

        if (zone) {
            res.json({ deliverable: true });
        } else {
            res.json({ deliverable: false });
        }
    } catch (error) {
        res.json({ deliverable: false, error: "Something went wrong." });
    }
});

app.post("/get-location", async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const nearestZone = await DeliveryZone.findOne({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longitude, latitude] },
                    $maxDistance: 10000
                }
            }
        });

        if (nearestZone) {
            res.json({ deliverable: true, pincode: nearestZone.pincode });
        } else {
            res.json({ deliverable: false });
        }
    } catch (error) {
        res.json({ deliverable: false, error: "Something went wrong." });
    }
});



app.get("/users/register",(req,res)=>{
    res.render("register.ejs");
});

app.get("/users/login",(req,res)=>{
    res.render("login.ejs");
});

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/", profileRoutes);
app.use("/",cartRoutes);



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});






