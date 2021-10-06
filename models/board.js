const mongoose = require("mongoose")

const boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 16384,
  },
  desc: {
    type: String,
    minlength: 0,
    maxlength: 16384,
  },
})

const Board = mongoose.model("Board", boardSchema)

module.exports = Board
