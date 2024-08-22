const favoritesService = require("../services/favoriteService");
const app_constant = require("../constants/app.json");

const addToFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const { recipeId } = req.body;

        if (!recipeId) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: "Recipe ID is required.",
                result: {},
            });
        }

        const result = await favoritesService.addToFavorites(userId, recipeId);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await favoritesService.getFavorites(userId);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
};

const removeFromFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const recipeId = req.params.id;
        // console.log(recipeId);

        if (!recipeId) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: "Recipe ID is required.",
                result: {},
            });
        }

        const result = await favoritesService.removeFromFavorites(
            userId,
            recipeId
        );
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.json({
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        });
    }
};

module.exports = {
    addToFavorites,
    getFavorites,
    removeFromFavorites,
};