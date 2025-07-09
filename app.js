// jshint esversion:6 - also add to json - "type": "commonjs",

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



// for the form
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");   
});


app.post("/", function (req, res) {
    const firstName= req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName, lastName, email); // num1 shows up as text from bodyparser 

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

var jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/ad60b5f229";
const options = {
    method: "POST",
    auth: "segun1:22c5388d07c32170dd9acde599058292-us18"
}

const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html"); 
    } else {
        res.sendFile(__dirname + "/failure.html"); 
    }

    response.on("data", function(data) {
        console.log(JSON.parse(data));
    });
});


request.write(jsonData);
request.end();

});


app.post("/failure", function(req, res) {
    res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});


// API KEY
// 22c5388d07c32170dd9acde599058292-us18

//  list ID
// ad60b5f229





// install express - npm i express
// install body parser -  npm i body-parser
// install request - npm i request
// at once - npm install body-parser express request