
const express = require('express')
const {registerUser,loginUser} = require("../../controllers/auth/auth-controller")
const router = express.Router()

router.post("/rigister",registerUser)
router.post("/login",loginUser)

module.exports = router