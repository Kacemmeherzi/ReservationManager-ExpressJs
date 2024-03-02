const express = require('express');
const app = express();
const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;
app.use(express.json());
const User = require('./models/user.js') ;
const tokenextract = require('./jwt/jwtMiddleware.js')
const userController = require('./controllers/usercontroller.js');
const jwt = require('./jwt/jwtUtils.js')
const auth  = require('./routes/auth.js')
dotenv.config();
const MONGO_URI = process.env.MONGO_URI  ;
 const PORT= process.env.PORT|| 3000 ;



 app.use(["/proc/*"],tokenextract);

app.use("/proc/user",userController);


app.use("/auth",auth) ;



//Mongo connct
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });




