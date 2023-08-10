const path = require ('path');
const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const app =express();
const expenseRoutes = require('./routes/expense')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(cors());


 // API endpoint to insert a new user
app.use('/post/expense', expenseRoutes);

// API endpoint to get all users
app.use('/get/expense', expenseRoutes);

// API endpoint to perform delete and edit task on user data
app.use('/user', expenseRoutes);
 

app.get('/', (req, res) => {  res.send('Welcome to the Appointment Booking App'); });

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal Server Error' });
});
 
 

sequelize.sync().then(result => {
  app.listen(3000) 
}).catch(err => {
  console.log(err);
});

