const axios = require("axios");
const app_constant = require("../constants/app.json");
require("dotenv").config();

const apiKey = process.env.SPOONACULAR_API;

const searchRecipesByIngredients = async (ingredients) => {
    try {
        const response = await axios.get(
            "https://api.spoonacular.com/recipes/findByIngredients",
            {
                params: {
                    ingredients,
                    apiKey,
                    number: 5,
                },
            }
        );

        return {
            success: 1,
            status_code: app_constant.SUCCESS,
            message: "Recipes fetched successfully",
            result: response.data,
        };
    } catch (error) {
        console.error(error);
        return {
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        };
    }
};

const getRecipeDetails = async (recipeId) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information`,
            {
                params: {
                    apiKey,
                },
            }
        );

        return {
            success: 1,
            status_code: app_constant.SUCCESS,
            message: "Recipe details fetched successfully",
            result: response.data,
        };
    } catch (error) {
        console.error(error);
        return {
            success: 0,
            status_code: app_constant.INTERNAL_SERVER_ERROR,
            message: error.message,
            result: {},
        };
    }
};

module.exports = {
    searchRecipesByIngredients,
    getRecipeDetails,
};