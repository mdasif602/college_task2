const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.json({
            success: 0,
            status_code: 401,
            message: "Please passs the token",
            result: {},
        });
    }
    const token = authorization.replace("Bearer ", "");

    const verify_token = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify_token) {
        return res.json({
            success: 0,
            status_code: 401,
            message: "Inavalid token",
            result: {},
        });
    }

    const { id } = verify_token;
    const user_data = await userModel.findById(id);
    if (token !== user_data.token) {
        return res.json({
            success: 0,
            status_code: 401,
            message: "Inavalid token",
            result: {},
        });
    }
    req.user = user_data;
    next();
};