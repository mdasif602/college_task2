const express = require("express");
const recipieController = require("../controllers/recipeController");

const RecipieRouter = express.Router();

RecipieRouter.get("/get", recipieController.searchRecipesByIngredients);
RecipieRouter.get("/get/:id", recipieController.getRecipeDetails);

module.exports = RecipieRouter;