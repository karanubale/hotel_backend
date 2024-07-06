const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();
const PORT = process.env.PORT || 3000

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.get('/', (req, res) => {
    res.send('welcome to my home');
})


const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

const personRoutes = require('./routes/personRouts');
app.use('/person', personRoutes);

app.listen(PORT, () => {
    console.log(`server listining on http://localhost/${PORT}`);
})