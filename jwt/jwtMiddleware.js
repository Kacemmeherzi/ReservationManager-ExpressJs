


function extractToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
  
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7); // Remove 'Bearer ' prefix
      req.token = token;
    }
  
    next();
  }
  
  module.exports = extractToken;
