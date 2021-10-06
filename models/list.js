const mongoose = require("mongoose")
const Card = require("./card")

const listSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  idBoard: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Board",
  },
}

const List = mongoose.model("List", listSchema)

module.exports = List
