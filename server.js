//requiring express and making the express app
const express = require("express");
const app = express();


// calling the mongodb function for collection and resolving it.then we are resolving the promise to an array.
const dbcall = require(__dirname+"/mongocall.js");


//using express.static to define directory for resources
app.use("/signupfiles",express.static("signup files"));
app.use("/loginfiles",express.static("login files"));


//requiring body parser to use elements from html using name and values.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


//requiring bcrpyt for securing the password checking security.
const bcrypt = require('bcrypt');
const saltRounds = 10;



//API for sign up page.
app.get("/signup", (req,res) => {
    res.sendFile(__dirname+"/signup files/signup.html");
});

//API for log in page.
app.get("/login", (req,res) => {
    res.sendFile(__dirname+"/login files/login.html");
});

app.get("/hiddenpage", (req,res) => {
    res.sendFile(__dirname+ "/hiddenpage.html");
})

//Posting the form for entered values of email, username and password and saving them to database.
app.post("/signup",async (req,res) => {
    const idpass= await dbcall.mongocall();
    bcrypt.hash(req.body.password, saltRounds, function(err,hash) {
        idpass.insertOne({
            "username": req.body.usern,
            "email": req.body.email,
            "password": hash
        });
        
    });
    res.redirect("/hiddenpage");
});

//posting the login form for entered values of username and password and comparing with password hash to login
app.post("/login", async (req,res) => {
    dbcall.mongocall().then((response,err)=>{
        response.find({username: req.body.username}).toArray().then((error,data)=>{
            //in case username is not found in database
            if(error){
                res.redirect("/login");
            }   
            else {
                bcrypt.compare(req.body.password, data[0].password ,(err,result) => {
                    if(err){
                    console.log(err);
                    }
                    //in case password is true
                    else if(result==true){
                        res.redirect("/hiddenpage");
                    }
                    //in case password is false
                    else if(result==false){
                        res.redirect("/login");
                    }
                });
            }
        }); 
    });
});
    
    

//listening to the port 3000.
app.listen(3000);