const jwt = require("jsonwebtoken");

//TODO : USer type

function generateToken(user) {
  const secretKey = process.env.SECRET_KEY;
  const payload = {
    iss: "kacem",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 2, // 2 heure
    customClaim: user._id,
    roles: ["admin", "user"],
  };
  return jwt.sign(payload, secretKey);
}
//TDOO :: verfiy the payload aka userid existance in the collection !!
function verifytoken(token) {
  var valid = true;
  var message;
  var payload ;
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    //console.log("aaaaaaaaa",decoded)
    if (err) {
      message = err.message;
      valid = false;
    }else {payload = decoded}
  });

  return { valid: valid, message: message , payload :payload };
}
//TODO :: refrech token methood


function generateToken_comfirm(reservation) {
  const secretKey = process.env.SECRET_KEY;
  const payload = {
    iss: "kacem",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 2, // 2 heure
    resid: reservation._id,
    roles: ["admin", "user"],
  };
  return jwt.sign(payload, secretKey);
}
module.exports = { generateToken, verifytoken,generateToken_comfirm };
