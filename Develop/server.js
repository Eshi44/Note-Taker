console.log("hello world!");
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



const PUBLIC_DIR = path.join(__dirname, "public");

app.use('/', express.static(PUBLIC_DIR));
app.use('/assets/css', express.static(PUBLIC_DIR));
app.use('/assets/js', express.static(PUBLIC_DIR));

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
  fs.readFile("./db/db.json", function(error,data) {
    if(error) { console.log("no reading");

  }
  //parse data
  res.json(JSON.parse(data));
  });
});

// * POST `/api/notes` - Should receive a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req,res) {
  //let variable = req.body
  let newNotes = req.body;

  //need to read json file
  fs.readFile("./db/db.json", function(error,data) {
    if(error) { console.log("no reading in post");
  }

  //parse and push req.body
  JSON.parse(data).push(newNotes);

  //now write to file
  fs.writeFile("./db/db.json", JSON.stringify(JSON.parse(data)), function(error) {
    if(error) { console.log("no writing in post");
    }
    res.send("You're writing to file!");
  
  });


});
  });
  
  //app.get :id
app.get("/api/notes/:id", function(req,res) {
  const getNoteById = req.params.id;


  //read file
  fs.readFile("./db/db.json", function(error, data){
    if(error) {
      console.log("error reading id");
    }
    if (data) {
      const noteData = JSON.parse(data);
      const filterNoteData = noteData.filter(note=> note.id === getNoteById);
      res.json(filterNoteData);
    } else
    console.log("error no notes")
  })

});



  // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
  // This means you'll need to find a way to give each note a unique `id` when it's saved. 
  // In order to delete a note, you'll need to read all notes from the `db.json` file, remove the 
  // note with the given `id` property, and then rewrite the notes to the `db.json` file.

