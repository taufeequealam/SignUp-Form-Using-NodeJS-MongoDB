const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const bodyParser = require("body-parser");
const res = require("express/lib/response");



app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 8500;

mongoose.connect('mongodb://localhost:27017/Rezolve_db',(err,res) =>{
   if (err) {
       console.log("Oops! Database is not Connected.",err)
   } else {
       console.log("Database is connected Successfully !!!")
     
   }
})



// create userModel
const userSchema = {
    firstName: String,
    lastName: String,
    email:String,
    password : String
}


const Users = mongoose.model("Users", userSchema);


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
})


app.post("/", function(req,res) {
    let newUsers = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password  = bcrypt.hashSync(req.body.password)
        
    
    });
    newUsers.save();
    
})


app.listen(PORT, () => {
    console.log('Server is running on PORT : ', PORT);
})