const express = require('express')
const router = express.Router()
const {
  Signup,
  Signin,
  updateUser,
  deleteUser,
} = require("../controller/auth");

router.post('/signup', Signup)
router.post("/signin", Signin)
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);


module.exports = router