const express = require("express")
const router = express.Router()
const boardController = require("../controllers/boardController")
const auth = require("../middleware/auth")
const joiSchemas = require("../middleware/joi/joiSchemas")

// Create a new board
router.post(
  "/",
  auth,
  joiSchemas.createBoardSchema,
  boardController.create_board
)
// Get a board
router.get("/:id", auth, joiSchemas.idSchema, boardController.get_board)
// Delete a board
router.delete("/:id", auth, joiSchemas.idSchema, boardController.delete_board)

module.exports = router
