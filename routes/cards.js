const express = require("express")
const router = express.Router()
const cardController = require("../controllers/cardController")
const auth = require("../middleware/auth")

// Create a new card
router.post("/", auth, cardController.create_card)
// Get a card
router.get("/:id", auth, cardController.get_card)
// Update a card
router.put("/:id", auth, cardController.update_card)
// Add new comment to a card
router.post("/:id/actions/comments", auth, cardController.add_comment)
// Add a member to a card
router.post("/:id/idMembers", auth, cardController.add_member)
// Delete a comment on a card
router.delete(
  "/:id/actions/:idAction/comments",
  auth,
  cardController.delete_comment
)
// Delete a member from a card
router.delete("/:id/idMembers/:idMember", auth, cardController.delete_member)
// Delete a card and its comments
router.delete("/:id", auth, cardController.delete_card)

module.exports = router
