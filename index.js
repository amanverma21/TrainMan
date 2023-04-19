const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(process.env.URI)
    .then(() => { console.log("Database connected...") })
    .catch((e) => { console.log(e) });

app.get('/', (req, res) => {
    res.send('Login Page!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});