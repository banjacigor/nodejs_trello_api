if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const mongoose = require("mongoose")

const app = express()

const memberRouter = require("./routes/members")
const cardRouter = require("./routes/cards")
const listRouter = require("./routes/lists")
const boardRouter = require("./routes/boards")

app.use(express.json())

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
})

app.use("/1/members", memberRouter)
app.use("/1/cards", cardRouter)
app.use("/1/lists", listRouter)
app.use("/1/boards", boardRouter)

const port = process.env.PORT || 3000

app.listen(port)
