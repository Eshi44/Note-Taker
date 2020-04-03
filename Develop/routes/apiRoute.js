//require file system
const fs = require("fs");

//require  the json file
const json = require("/db/db");
//require util
const util = require("util");
//add variable to promisify that uses the writefile method
const writeToFile = util.promisify(fs.writeFile);



//create a variable of an array of objects as example
//dummy data
// var notesExample = [
//     {
//     "title":"Title 1",
//     "text":"text",
//     "id":1
//     },
//     {
//     "title":"Title 2",
//     "text":"text",
//     "id":2
//     }  
// ];


  // notes route - this file has been exported as a funtion - 
  //need to require it in the server.js file
  module.exports = function(app) {

    //to display notes example
  app.get("/notes", function(req, res) {
    res.json(json);
  });

  //create a new post
  app.post("/api/notes", function(req,res) {

    //req.body is an obj containing text parameters 
    //from the parsed request body -defaults to {}.
    let inputtedNote = req.body;

    //check and get last id in json file
    let id = json[json.length - 1]["id"];
    //let note have one greater id
    let finalId = id +1;
    inputtedNote["id"] =finalId;
    
    json.push(inputtedNote);

    //write new notes to json file
    writeToFile("./db/db.json", JSON.stringify(json)).then(function() {
        console.log("success");
    });

    res.json(inputtedNote);


  });
  
 

}