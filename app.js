const express = require('express');
const app = express();
const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;
app.use(express.json) ;
dotenv.config();
const MONGO_URI = process.env.MONGO_URI  ;
 const PORT= process.env.PORT|| 3000 ;
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
console.log (MONGO_URI)
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




