const jwt = require('jsonwebtoken');



function generateToken (user){
    const secretKey= process.env.SECRET_KEY ;
const payload = {
  iss: 'kacem',          
  sub: user.username,   
  iat: Math.floor(Date.now() / 1000),                               
  exp: Math.floor(Date.now() / 1000) + (3600*2),  
  customClaim: 'some_value',   
  roles: ['admin', 'user']     
};
return jwt.sign(payload, secretKey);

}
function verifytoken(token) {
    const secretKey= process.env.SECRET_KEY ;
return jwt.verify(token,secretKey)
}

module.exports= {generateToken , verifytoken }; 
