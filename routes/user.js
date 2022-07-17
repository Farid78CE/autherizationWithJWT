const express = require("express");
const router = express.Router();

const {signUp, signIn} = require('../controllers/user.js'); 


// register
router.post("/sign-up", signUp);
// login 
router.post("/sign-in", signIn);

module.exports = router;
