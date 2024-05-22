const express = require('express')
const router = express.Router();
const {handleNewReviews, handleReviews}= require('../controllers/reviews');
const { login,register } = require('../controllers/auth');
const { isAuthenticated } = require('../middlewares/user');
router.post("/add",isAuthenticated,handleNewReviews);
router.get("/reviews/:id",handleReviews);

router.route("/login").post(login);
router.route("/register").post(register);

module.exports=router;