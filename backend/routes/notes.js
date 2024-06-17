const express = require("express");
const route = express.Router();
const fetchUser = require("../Middlewear/fetch");
const notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

route.get("/fetchAllnotes", fetchUser, async (req, res) => {
  const Notes = await notes.find({ user: req.user.id });
  res.json(Notes);
});
route.post(
  "/addNote",
  fetchUser,
  [
    body("title", "name must be required 5 character ").isLength({ min: 5 }),
    body("description", "Description must be required 5 charactor").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
      response = await notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }

    //  res.json(Notes)
  }
);
route.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, descriptio, tag } = req.body;
  newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (descriptio) {
    newNote.descriptio = descriptio;
  }
  if (tag) {
    newNote.tag = tag;
  }
  let note = await notes.findById(req.params.id)
  if(!note){
    res.status(404).send("not found")
  }
  if(note.user.toString() != req.user.id){
    return res.status(401).send("not found")
  }

  note = await notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note})
});


route.delete ("/deleteNote/:id" , fetchUser , async(req,res)=>{
  const { title, descriptio, tag } = req.body;
  let note = await notes.findById(req.params.id)
  if(!note){
    res.status(404).send("not found") 
  }
  if(note.user.toString() != req.user.id){
    return res.status(401).send("not found")
  }
  note = await notes.findByIdAndDelete(req.params.id)
  res.json({"Success" : "Note has been deleted successfully", note:note})
})
module.exports = route;
