const jwt = require("jsonwebtoken");

//TODO : USer type

function generateToken(user) {
  const secretKey = process.env.SECRET_KEY;
  const payload = {
    iss: "kacem",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 10, // 2 heure
    customClaim: user._id,
    roles: user.role,
  };
  return jwt.sign(payload, secretKey);
}
//TDOO :: verfiy the payload aka userid existance in the collection !!
function verifytoken(token) {
  var valid = true;
  var message;
  var payload;
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    //console.log("aaaaaaaaa",decoded)
    if (err) {
      message = err.message;
      valid = false;
    } else {
      payload = decoded;
    }
  });

  return { valid: valid, message: message, payload: payload };
}
//TODO :: refrech token methood

// token gen for the reservation comfirmation
function generateToken_comfirm(id) {
  const secretKey = process.env.SECRET_KEY;
  const payload = {
    iss: "kacem",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 2, // 2 hours
    resid: id,
  };
  return jwt.sign(payload, secretKey);
}

async function has_admin_role(req, res, next) {
  const payload = req.tokenpayload;
  if (payload.roles === "admin") next();
  else {
    res.status(403).json({ message: "admin role required" });
  }
}
module.exports = {
  generateToken,
  verifytoken,
  generateToken_comfirm,
  has_admin_role,
};
