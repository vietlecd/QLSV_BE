const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const session = require('express-session');

const app = express();

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));


const cors = require('cors');
const mongoose = require('mongoose');


//Routers
const adminRoute = require('./routes/admin/index.route');
const userRoute = require('./routes/users/index.route');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/home');
  });
});

  
app.use(bodyParser.json());

// Admin route setup
adminRoute(app);
userRoute(app);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
