// Load the Express package as a module
const express = require("express");
// Load the body-parser package as a module
const bodyParser = require("body-parser");
// Access the exported service
const app = express();
// Access the JSON parsing service
const jsonParser = bodyParser.json();

var todoItems = [{
    itemId   : "2d1f0810-95de-46fe-9668-c885cfbd8172",
    text : "First To Do",
    completed : false,
  },{
    itemId   : "5f94ab60-9064-4836-8d7f-34469a5a3a1c",
    text : "Second To Do",
    completed : true,
  }];

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Return a string for requests to the root URL ("/")
app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

app.get("/items", (request, response)=>{
    response.json(todoItems);
});

app.post("/items", jsonParser, (request, response)=>{
    const item = request.body;
    console.log(`You sent me an item: ${JSON.stringify(item)}`);
    todoItems = todoItems.concat([item]);
    let resp = {itemId : item.itemId};
    response.send(JSON.stringify(resp));
});

app.put("/items/:itemId", jsonParser, (request, response) => {
    const body = request.body;
    const itemId = request.params["itemId"];
    for (let i=0; i < todoItems.length; i++) {
      if (todoItems[i].itemId == itemId) {
          todoItems[i].completed = body.completed;
          break;
      }
    }
    console.log(`Update item ${itemId}`);
    response.send(JSON.stringify({itemId : itemId}));
});

app.delete("/items/:itemId", jsonParser, (request, response) => {
    const itemId = request.params["itemId"];
    let indexToRemove = -1;
    for (let i=0; i < todoItems.length; i++) {
      if (todoItems[i].itemId == itemId) {
          indexToRemove = i;
          break;
      }
    }

    if (indexToRemove !== -1) {
        todoItems.splice(indexToRemove, 1);
    }

    response.send(JSON.stringify({itemId : itemId}));

});

// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});