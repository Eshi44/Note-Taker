//add dependencies
const express = require("express");

//set up express app
const app = express();

//set a port to run at 3000
const PORT = process.env.PORT || 3000;

//set up the Express app - middleware to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//create a variable of an array of objects as example
var notesExample = [
    {
    "title":"Title 1",
    "text":"text",
    "id":1
    },
    {
    "title":"Title 2",
    "text":"text",
    "id":2
    }
    
];


//add routes
//basic route that sends user to first AJAX page
app.get("/", function(req, res) {
   
    res.sendFile(path.join(__dirname, "index.html"));
  });


  



