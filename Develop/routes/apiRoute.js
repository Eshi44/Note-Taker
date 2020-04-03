//require file system
const fs = require("fs");



//create a variable of an array of objects as example
//dummy data
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


  // notes route
  app.get("/notes", function(req, res) {
   
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
