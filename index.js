const express = require("express");

const server = express();
server.use(express.json());

const hubsRouter = require("./hubs/posts-router");

//endpound

//when the url of requrest beging with /api/hubs use router
server.use("/api/posts", hubsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Posts API</h>
    
  `);
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub
const port = 4000;
server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
