const express = require("express");
const Hubs = require("../data/db");
const router = express.Router();

// GET /api/posts
router.get("/", (req, res) => {
  Hubs.find(req.query).then((hubs) => {
    res.status(200).json(hubs);
    res
      .status(500)
      .json({ errorMessage: "The posts information could not be retrieved." });
  });
});

// GET /api/posts/:id
router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id).then((post) => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      try {
        res.status(200).json(post);
      } catch {
        res.status(500).json({
          errorMessage: "The post information could not be retrieved.",
        });
      }
    }
  });
});

//POST /api/posts
router.post("/", (req, res) => {
  Hubs.insert(req.body)
    .then((newpost) => {
      if (newpost.title === "" || newpost.contents === "") {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        res.status(201).json(newpost);
      }
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the post to the database",
      });
    });
});

// -----need to change all below---
//PUT /api/posts/:id
// router.put("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const edited = req.body;

//   let userToEdit = posts.find((u) => u.id === id);

//   if (!edited.name || !edited.bio) {
//     //respond with HTTP status code 400 (Bad Request).
//     //return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
//     //If there's an error when updating the user:
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide name and bio for the user." });
//     //If the user with the specified id is not found:
//   } else if (!userToEdit) {
//     //respond with HTTP status code 404 (Not Found).
//     //return the following JSON object: { message: "The user with the specified ID does not exist." }.
//     //If the request body is missing the name or bio property:
//     res
//       .status(404)
//       .json({ errorMessage: "The user with the specified ID does not exist." });
//   } else if (userToEdit) {
//     Object.assign(userToEdit, edited);
//     //If the user is found and the new information is valid:
//     //update the user document in the database using the new information sent in the request body.
//     //respond with HTTP status code 200 (OK).
//     //return the newly updated user document.
//     res.status(200).json(userToEdit);
//   } else {
//     //respond with HTTP status code 500.
//     //return the following JSON object: { errorMessage: "The user information could not be modified." }.
//     res
//       .status(500)
//       .json({ errorMessage: "The user information could not be modified" });
//   }
// });

// //DELETE /api/posts/:id
// router.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const deleted = posts.find((u) => u.id === id);
//   if (!deleted) {
//     res
//       .status(404)
//       .json({ message: "The user with the specified ID does not exist." });
//   } else {
//     posts = posts.filter((u) => u.id !== id);
//     res.status(200).json({ data: posts });
//   }
// });

//export default router;
module.exports = router;
