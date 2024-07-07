const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
var passport = require('./auth');

const PORT = process.env.PORT || 3000


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()} ] Request made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);



const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.use(passport.initialize());
const localAuthMiddleware= passport.authenticate('local', { session: false });
app.get('/', (req, res) => {
    res.send('welcome to my home');
})

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

const personRoutes = require('./routes/personRouts');
app.use('/person', personRoutes);

app.listen(PORT, () => {
    console.log(`server listining on http://localhost/${PORT}`);
})