const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user.model.js");



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fashGo');
}
main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => console.log(err));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/",(req,res) => {
    res.render("home.ejs");
});

app.get("/register",(req,res)=>{
    res.render("register.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.post("/signup",async(req,res)=>{
    try{
        let {name,email,password} = req.body;

        if(!name) {
            res.status(400).json({message:"Name is required"});
        }

        if(!email) {
            res.status(400).json({message:"Email is required"});
        }

        if(!password) {
            res.status(400).json({message:"Password is required"});
        }

        let newUser = new User({
            name : name,
            email : email,
            password : password
        });

        await newUser.save();

    }catch(err){
        throw err || err.message;
    }
    
    res.redirect("/");
});


app.post("/login",async(req,res)=>{
    try{
        let {email,password} = req.body;

        let user = User.findOne({email});

        if(!user){
            res.status(400).json({message:"User not Registered"});
        }

        if(!email) {
            res.status(400).json({message:"Email is required"});
        }

        if(!password) {
            res.status(400).json({message:"Password is required"});
        }

        let emails = User.findOne({email});

        if(emails && password === User.findOne({password})){
            res.status(200).json({message:"Login Successfully"});
        }else{
            res.status(400).json({message:"Invalid Email or password"})
        }


    }catch(err){
        throw err || err.message;
    }
    
    res.redirect("/");
});



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});







document.addEventListener("DOMContentLoaded", function () {
    const wishlistButton = document.querySelector(".wishlist-button");
    const wishlistIcon = wishlistButton.querySelector(".wishlist-icon");
    
    wishlistButton.addEventListener("mouseenter", function () {
        // Create a new Image element to completely reset the GIF
        let newGif = document.createElement("img");
        newGif.src = "./images/icons8-heart.gif"; // Set GIF source
        newGif.className = "wishlist-icon"; // Apply same class
        newGif.style.height = "24px"; // Maintain same size

        // Replace the old image with the new one
        wishlistIcon.replaceWith(newGif);

        // Update reference to new image
        wishlistIcon = newGif;
    });

    wishlistButton.addEventListener("mouseleave", function () {
        setTimeout(() => {
            let newStaticImg = document.createElement("img");
            newStaticImg.src = "./images/icons8-heart-50.png"; // Set PNG source
            newStaticImg.className = "wishlist-icon"; // Apply same class
            newStaticImg.style.height = "24px"; // Maintain same size

            // Replace the GIF with the static PNG
            wishlistIcon.replaceWith(newStaticImg);

            // Update reference to new image
            wishlistIcon = newStaticImg;
        }, 1000); // Delay to let GIF play once
    });
});


