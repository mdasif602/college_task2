const recipeService = require("../services/recipeService");
const app_constant = require("../constants/app.json");

const searchRecipesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.query;

        if (!ingredients) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: "Ingredients query parameter is required.",
                result: {},
            });
        }

        const searchResults = await recipeService.searchRecipesByIngredients(
            ingredients
        );

        return res.json(searchResults);
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

const getRecipeDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({
                success: 0,
                status_code: app_constant.BAD_REQUEST,
                message: "Recipe ID parameter is required.",
                result: {},
            });
        }

        const recipeDetails = await recipeService.getRecipeDetails(id);

        return res.json(recipeDetails);
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
    searchRecipesByIngredients,
    getRecipeDetails,
};