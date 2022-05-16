import User from "../models/User.js";

export const register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.email,
            email: req.body.email,
            password: req.body.password
        });
        await newUser.save();
        res.status(200).json({ message: "User has been created" });
    } catch (error) {
        next(error);
    }
};
