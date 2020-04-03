// console.log("hello world!");
//add dependencies
const express = require("express");
//require path
const path = require("path");
//require file system
const fs = require("fs");

//set up express app
const app = express();

//set a port to run at 3000
const PORT = process.env.PORT || 3000;

//set up the Express app - middleware to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//add routes
//basic route that sends user to first AJAX page
// app.get("/", function(req, res) {
   
//     res.sendFile(path.join(__dirname, "/public/index.html"));
//   });

//require apiRoute
// require("./routes/apiRoute")(app);
//require htmlRoute
// require("./routes/htmlRoute")(app);

//routes

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// * GET `*` - Should return the `index.html` file
app.get("*", function(req,res){
  res.sendFile(path.join(__dirname, "public/index.html"));
  
});


//add listen method so server can begin to listen on the PORT
  app.listen(PORT,function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });
  
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
//read json file app.get route - requires fs package
app.get("/api/notes", function(req,res) {
  fs.readFile(__dirname + "db/db.json", function(error,data) {
    if(error) { console.log("no reading");
  }
  res.json(JSON.parse(data));
  });
});

// * POST `/api/notes` - Should receive a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.