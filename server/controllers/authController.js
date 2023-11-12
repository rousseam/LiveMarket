const User = require('../models/user');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name) {
            return res.json({
                error: 'Name is required'
            });
        }
        if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 chars'
            });
        }
        const isEmailAlreadyTaken = await User.findOne({email});
        if (isEmailAlreadyTaken) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({name, email, password: hashedPassword});
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }
        if (!password) {
            return res.json({
                error: 'Password is required'
            });
        }
        const user = await User.findOne({email}).exec();
        if (!user) {
            return res.json({
                error: 'Email is not registered, please do so before login'
            });
        }
        const isPasswordRight = await comparePassword(password, user.password);
        if (!isPasswordRight) {
            return res.json({
                error: 'Incorrect password'
            });
        }
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie('token', token).json(user);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser,
    loginUser
}