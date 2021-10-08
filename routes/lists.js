const express = require("express")
const router = express.Router()
const listController = require("../controllers/listController")
const auth = require("../middleware/auth")

// Create a new list
router.post("/", auth, listController.create_list)
// Get a list
router.get("/:id", auth, listController.get_list)
// Update a list
router.patch("/:id", auth, listController.update_list)
// Get cards in a list
router.get("/:id/cards", auth, listController.get_cards)
// Get the board a list is on
router.get("/:id/board", auth, listController.get_board_for_list)
// Move list to board
router.patch("/:id/idBoard", auth, listController.move_list_to_board)
// Move all cards in list
router.post("/:id/moveAllCards", auth, listController.move_all_cards)

module.exports = router
