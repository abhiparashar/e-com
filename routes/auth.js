const express = require('express')
const router = express.Router()
const {
  Signup,
  Signin,
  updateUser,
  deleteUser,
  getAllUsers
} = require("../controller/auth");

router.get('/getAllUsers', getAllUsers)
router.post('/signup', Signup)
router.post("/signin", Signin)
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);


module.exports = router