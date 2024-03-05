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
const roomcontroller = require('./controllers/roomcontroller.js')
dotenv.config();
const cors = require('cors')
const MONGO_URI = process.env.MONGO_URI  ;
 const PORT= process.env.PORT|| 3000 ;


//ROUTES
app.use(["/proc/*"],tokenextract);
app.use("/proc/user",userController);
app.use("/auth",auth) ;
app.use("/room",roomcontroller)

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




//CORS SITTINGS
const corsOptions = {
  origin: 'http://localhost:4200',// the client side dev origin 
  //optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
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




