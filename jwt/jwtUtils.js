const jwt = require('jsonwebtoken');

//TODO : USer type

function generateToken (user){
    const secretKey= process.env.SECRET_KEY ;
const payload = {
  iss: 'kacem',          
  sub: user.username,   
  iat: Math.floor(Date.now() / 1000),                               
  exp: Math.floor(Date.now() / 1000) + (3600*2),  // 2 heure
  customClaim: 'some_value',   
  roles: ['admin', 'user']     
};
return jwt.sign(payload, secretKey);

}
//TDOO :: verfiy the payload aka userid existance in the collection !! 
function verifytoken(token) {
    var  valid = true;
    var message ;
    const secretKey= process.env.SECRET_KEY ;
    jwt.verify(token,secretKey, (err, decoded) => { //console.log("aaaaaaaaa",decoded)
        if (err) {
            message = err.message
          valid = false;
        }})
        
        return {"valid":valid ,"message": message} ;
}
//TODO :: refrech token methood 


module.exports= {generateToken , verifytoken }; 
