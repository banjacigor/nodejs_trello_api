const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
  text: {
    type: String,
  },
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
