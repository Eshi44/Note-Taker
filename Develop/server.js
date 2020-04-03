//add dependencies
const express = require("express");

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
require("./routes/apiRoute")(app);




//add listen method so server can begin to listen on the PORT
  app.listen(PORT,function() {
    console.log("App listening on http://localhost: " + PORT);
  });
  



