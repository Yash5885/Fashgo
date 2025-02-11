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
