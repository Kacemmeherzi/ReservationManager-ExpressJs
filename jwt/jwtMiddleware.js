const jwt = require("./jwtUtils");

function extract_validate_Token(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.substring(7); // Remove 'Bearer ' prefix //OR substring('')[1]
    req.token = token;
    console.log(jwt.verifytoken(token));
    const validity = jwt.verifytoken(token);
    if (validity.valid) {
      req.tokenpayload = validity.payload
      console.log(validity.payload);
      next();
    } else {
      res.status(403).json({ messsage: validity.message });
    }
  } else {
    res
      .status(403)
      .json({ messsage: "unauthorized ye bro hot token fel header" });
  }
}

module.exports = extract_validate_Token;
