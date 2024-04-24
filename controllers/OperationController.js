const jwt = require("../jwt/jwtUtils.js");
const Operation = require("../models/operation.js")
const mailservice = require("../notificationmanager/mailservice.js");
const User = require ("../models/user.js")
const OperationController = {

createOperation : async(req , res) => {
    try {
const userid = req.body.userid       
const  oper  = req.body.oper ;
const  resid  = req.body.resid
const token = jwt.generateToken_comfirm(resid)
const content = req.body.content
const user = User.findById(userid)
const operation = await new Operation({
    op : oper ,
    reservationid : resid,
    token : token,
    content : content
}).save()
const mailOptions = mailservice.createmailbody(user, token,);
//send the mail
await mailservice.sendMail(mailOptions);
res
  .status(201)
  .json({
    message: "added",
    operation: operation,
  });
}catch(e){
res.status(400).json({ message: e.message });
}}

















,
 confirmToken :  async (req, res) => {
        const token = req.params.token;
        const data = jwt.verifytoken(token);
        if (data.valid) {
          console.log(data.payload.resid);
          const reservation = await Reservation.findByIdAndUpdate(
            data.payload.resid,
            { validation: true },
          );
          res.send("<h1> COMFIRMED </h1>");
        } else {
          res.send("<h> ERROR </h1>");
        }
      },
}


module.exports = OperationController