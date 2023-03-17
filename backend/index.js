const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes');
const app = express();
app.use(
  cors({
    origin: [
      "https://chuongnt.internship.designveloper.com",
      "http://localhost:3000",
    ],
  
  })
);
require('dotenv').config();

require('./models/users');
require('./models/articles');


//connectdb.Get();
mongoose.connect(process.env.MONGODB_URL, ()=>{
  console.log("CONNECTED TO MONGO DB");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: '*' }));


route(app);



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})


