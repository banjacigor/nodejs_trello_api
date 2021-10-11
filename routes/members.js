const express = require("express")
const router = express.Router()
const memberController = require("../controllers/memberController")
const auth = require("../middleware/auth")
const joiSchemas = require("../middleware/joi/joiSchemas")

// Create member (sign up)
router.post("/", joiSchemas.createMemberSchema, memberController.create_member)
// Log in member
router.post("/login", joiSchemas.loginMember, memberController.login_member)
// Log out member
router.post("/logout", auth, memberController.logout_member)
// Get member by ID
router.get("/:id", auth, joiSchemas.idSchema, memberController.get_member)
// Update member
router.patch(
  "/:id",
  auth,
  joiSchemas.idSchema,
  joiSchemas.updateMemberSchema,
  memberController.update_member
)
// Delete member
router.delete("/:id", auth, joiSchemas.idSchema, memberController.delete_member)

module.exports = router
