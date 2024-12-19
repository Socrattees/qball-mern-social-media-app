import express from "express";
import Conversation from "../models/Conversation.js";

const router = express.Router();


//CREATE CONVERSATION
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json("New conversation has been created");
  } catch (err) {
    res.status(500).json(err);
  }
})

//GET CONVERSATION
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;