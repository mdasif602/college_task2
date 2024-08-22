const bcrypt = require("bcrypt");
const app_constant = require("../constants/app.json");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const SECRET_KEY = process.env.SECRET_KEY;

const userSignup = async (data) => {
    const user_data = await userModel.findOne({ email: data.email });
    if (user_data) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Email already exist!",
            result: {},
        };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const addUser = await userModel.create({ ...data, password: hashPassword });
    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "user added successfully",
        result: addUser,
    };
};

const userLogin = async (data) => {
    const { email, password } = data;

    const user_data = await userModel.findOne({ email });

    if (!user_data) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Email does not exist!",
            result: {},
        };
    }

    const password_check = bcrypt.compareSync(password, user_data.password);

    if (!password_check) {
        return {
            success: 0,
            status: app_constant.BAD_REQUEST,
            message: "Invalid Credentials!",
            result: {},
        };
    }

    const token = jwt.sign({ id: user_data._id }, SECRET_KEY);

    await userModel.updateOne({ _id: user_data }, { $set: { token } });

    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "user loggedin successfully",
        result: token,
    };
};

const updateUserProfile = async (userId, updateData) => {
    const user = await userModel.findById(userId);

    if (!user) {
        return {
            success: 0,
            status: app_constant.NOT_FOUND,
            message: "User not found!",
            result: {},
        };
    }

    const updatedFields = {};

    if (updateData.username) {
        updatedFields.username = updateData.username;
    }
    if (updateData.bio) {
        updatedFields.bio = updateData.bio;
    }
    if (updateData.profilepic) {
        updatedFields.profilepic = updateData.profilepic;
    }
    if (updateData.email) {
        const emailExists = await userModel.findOne({
            email: updateData.email,
        });
        if (emailExists && emailExists._id.toString() !== userId) {
            return {
                success: 0,
                status: app_constant.BAD_REQUEST,
                message: "Email already in use!",
                result: {},
            };
        }
        updatedFields.email = updateData.email;
    }

    // Update the user with new fields
    const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updatedFields,
        { new: true }
    );

    return {
        success: 1,
        status: app_constant.SUCCESS,
        message: "Profile updated successfully",
        result: updatedUser,
    };
};

module.exports = {
    userSignup,
    userLogin,
    updateUserProfile,
};