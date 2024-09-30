const User = require("../models/User");
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        const user = await User.create({ email, password });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201)
            .json({ message: "User created succesfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ message : 'All fields are requried!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message : "Incorrect email or password" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message : 'Incorrect email or password' });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(201).json({ message: "User logged in successfully", success: true, user, token });
        next();
    } catch (error)  {
        console.error(error);
    }
};

module.exports.Delete = async (req, res, next) => {
    try {
        const { email} = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'user does not exist'});
        };
        console.log(existingUser._id);
        await User.findByIdAndDelete(existingUser._id);
        res.status(200).json({ message : 'user deleted successfully ', success : true })
        next();
    } catch (error) {
        console.error(error);
    };
};