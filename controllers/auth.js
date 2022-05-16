import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(hash);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).json({ message: "User has been created" });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found"));

        const isCorrectPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isCorrectPassword)
            return next(createError(400, "Wrong password or username"));

        const {password , isAdmin , ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        next(error);
    }
};
