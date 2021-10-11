const express = require("express")
const router = express.Router()
const listController = require("../controllers/listController")
const auth = require("../middleware/auth")
const joiSchemas = require("../middleware/joi/joiSchemas")

// Create a new list
router.post("/", auth, joiSchemas.createListSchema, listController.create_list)
// Get a list
router.get("/:id", auth, joiSchemas.idSchema, listController.get_list)
// Update a list
router.patch(
  "/:id",
  auth,
  joiSchemas.idSchema,
  joiSchemas.updateListSchema,
  listController.update_list
)
// Get cards in a list
router.get("/:id/cards", auth, joiSchemas.idSchema, listController.get_cards)
// Get the board a list is on
router.get(
  "/:id/board",
  auth,
  joiSchemas.idSchema,
  listController.get_board_for_list
)
// Move list to board
router.patch(
  "/:id/idBoard",
  auth,
  joiSchemas.idSchema,
  joiSchemas.idSchemaQuery,
  listController.move_list_to_board
)
// Move all cards in list
router.post(
  "/:id/moveAllCards",
  auth,
  joiSchemas.idSchema,
  joiSchemas.moveAllCards,
  listController.move_all_cards
)

module.exports = router
