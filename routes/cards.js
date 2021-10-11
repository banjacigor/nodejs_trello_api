const express = require("express")
const router = express.Router()
const cardController = require("../controllers/cardController")
const auth = require("../middleware/auth")
const joiSchemas = require("../middleware/joi/joiSchemas")

// Create a new card
router.post("/", auth, joiSchemas.createCardSchema, cardController.create_card)
// Get a card
router.get("/:id", auth, joiSchemas.idSchema, cardController.get_card)
// Update a card
router.patch(
  "/:id",
  auth,
  joiSchemas.idSchema,
  joiSchemas.updateCardSchema,
  cardController.update_card
)
// Add new comment to a card
router.post(
  "/:id/actions/comments",
  auth,
  joiSchemas.idSchema,
  joiSchemas.addCommentToCard,
  cardController.add_comment
)
// Add a member to a card
router.post(
  "/:id/idMembers",
  auth,
  joiSchemas.idSchema,
  joiSchemas.idSchemaQuery,
  cardController.add_member
)
// Delete a comment on a card
router.delete(
  "/:id/actions/:idAction/comments",
  auth,
  joiSchemas.removeCommentFromCardSchema,
  cardController.delete_comment
)
// Delete a member from a card
router.delete(
  "/:id/idMembers/:idMember",
  auth,
  joiSchemas.removeMemberFromCardSchema,
  cardController.delete_member
)
// Delete a card and its comments
router.delete("/:id", auth, joiSchemas.idSchema, cardController.delete_card)

module.exports = router
