const express = require("express")
const router = express.Router()
const boardController = require("../controllers/boardController")
const auth = require("../middleware/auth")

// Create a new board
router.post("/", auth, boardController.create_board)
// Get a board
router.get("/:id", auth, boardController.get_board)
// Delete a board
router.delete("/:id", auth, boardController.delete_board)

module.exports = router
