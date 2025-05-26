const User = require("../db/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/generateToken");

const register = async (req, res) => {
    const {
        login_name,
        password,
        first_name,
        last_name,
        location,
        description,
        occupation,
    } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ login_name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({
            login_name,
            password: hashedPassword,
            first_name,
            last_name,
            location,
            description,
            occupation,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                user: {
                    _id: newUser._id,
                    login_name: newUser.login_name,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    location: newUser.location,
                    description: newUser.description,
                    occupation: newUser.occupation,
                },
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { login_name, password } = req.body;
    try {
        const user = await User.findOne({ login_name });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            user: {
                _id: user._id,
                login_name: user.login_name,
                first_name: user.first_name,
                last_name: user.last_name,
                location: user.location,
                description: user.description,
                occupation: user.occupation,
            },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: error.message });
    }
};

const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error checking authentication:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    checkAuth,
};
