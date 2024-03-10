const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User Not Found')
        } else {
            const result = await bcrypt.compare(password, user.password);
            if (!result) throw new Error('Invalid credentials')
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
            res.json({ message: `Welcome, ${user.name}`, token });
        };
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const userSignUp = async (req, res) => {
    try {
        const { name, username, password, bio, profile_url } = req.body;
        const userName = await User.find({ username });
        if (userName.length != 0) {
            throw new Error("Username already Exists.")
        } else {
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = new User({ name, username, password: hashPassword, bio, profile_url });
            await user.save();
            res.status(201).json({ message: 'User SignUp successfully' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, password, username, bio, profile_url } = req.body;
        const userId = req.params.userId;
        const userName = await User.findOne({ username, _id: { $ne: userId } });
        if (userName.length != 0) {
            throw new Error("Username already exists")
        } else {
            let hashPassword;
            if (req.body.password) hashPassword = bcrypt.hashSync(req.body.password, 10);
            await User.findByIdAndUpdate(userId, { name, username, password: hashPassword, bio, profile_url });
            res.status(200).json({ message: 'User updated successfully' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let result = await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { userLogin, userSignUp, getUser, updateUser, deleteUser }
