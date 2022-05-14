const queryString = require("query-string")
const axios = require("axios")

const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: "http://localhost:4000/auth/google-redirect",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    })
    return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
}

const googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: "http://localhost:4000/auth/google-redirect",
            grant_type: "authorization_code",
            code,
        },
    });
    
    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });
    return res.redirect(
        `http://localhost:4000?email=${userData.data.email}`
    )
}

const facebookAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.FACEBOOK_CLIENT_ID,
    redirect_uri: "http://localhost:4000/auth/facebook-redirect/",
    scope: "email",
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });
  return res.redirect(
    `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`
  );
};


module.exports = {googleAuth, googleRedirect}
    
