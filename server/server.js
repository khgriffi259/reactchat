require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
const routes = require('./routes');

app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', routes.auth);


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}.`);
})

