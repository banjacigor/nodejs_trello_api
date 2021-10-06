const express = require("express")
const router = express.Router()
const memberController = require("../controllers/memberController")
const auth = require("../middleware/auth")

// Create member (sign up)
router.post("/", memberController.create_member)
// Log in member
router.post("/login", memberController.login_member)
// Log out member
router.post("/logout", auth, memberController.logout_member)
// Get member by ID
router.get("/:id", auth, memberController.get_member)
// Update member
router.put("/:id", auth, memberController.update_member)
// Delete member
router.delete("/:id", auth, memberController.delete_member)

module.exports = router
