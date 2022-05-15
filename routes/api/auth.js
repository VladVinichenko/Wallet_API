const express = require("express");
const router = express.Router();

const {
  googleAuth,
  googleRedirect,
  facebookAuth,
  facebookRedirect,
} = require( "../../controllers/auth");



router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);
router.get("/facebook", facebookAuth);
router.get("/facebook-redirect", facebookRedirect);

module.exports = router;