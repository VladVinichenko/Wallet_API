const express = require("express");
const router = express.Router();
const tryCatchWrapper = require("../../wrapper/try-catch")

const {
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect,
} = require( "../../controllers/auth");



router.get("/google", tryCatchWrapper(googleAuth));
router.get("/google-redirect", tryCatchWrapper(googleRedirect));
router.get("/facebook", tryCatchWrapper(facebookAuth));
router.get("/facebook-redirect", tryCatchWrapper(facebookRedirect));

module.exports = router;