const express = require('express');
const app = express();
const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;
app.use(express.json());
const userController = require('./controllers/usercontroller.js');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI  ;
 const PORT= process.env.PORT|| 3000 ;
app.use("/user",userController);


app.get('/', (req, res) => {
  res.json('Hello, World!');
});


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




