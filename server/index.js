const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

const PORT = 8000;

app.use('/', require('./routes/authRoutes'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});