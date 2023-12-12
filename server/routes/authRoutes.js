const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, getQuote} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'https://finnhub.io']
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/quote/:symbol', getQuote);

module.exports = router;