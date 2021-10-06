const mongoose = require("mongoose")
const Comment = require("./comment")

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
  },
  due: {
    type: Date,
    required: true,
  },
  dueComplete: {
    type: Boolean,
  },
  idList: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "List",
  },
  idComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  idMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
})

// Delete comments when a card is deleted
cardSchema.pre("remove", async function (next) {
  const card = this

  if (card.idComments.length === 0) {
    next()
  }
  await Comment.deleteMany({ _id: card.idComments })

  next()
})

const Card = mongoose.model("Card", cardSchema)

module.exports = Card
