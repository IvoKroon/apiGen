var express = require('express');

var routes = function (Recipe) {
    var recipeRouter = express.Router();

    var recipeController = require("../controllers/recipeController")(Recipe);
    var recipeDetailController = require("../controllers/recipeDetailController")(Recipe);

    recipeRouter.route('/')
        .get(recipeController.get)
        .post(recipeController.post);

    //detail
    recipeRouter.use('/:recipeId', function (req,res,next) {
        Recipe.findById(req.params.recipeId, function (err, recipe) {
            if (err)
                res.status(500).send(err);
            else if(recipe) {
                console.log("recipe found");
                req.recipe = recipe;
                next();
            }else{
                res.status(404).send("No book found!");
            }
        })
    });
    //detail router
    recipeRouter.route('/:recipeId')
        .get(recipeDetailController.get)
        .delete(recipeDetailController.remove)
        .put(recipeDetailController.put);

    return recipeRouter;

};

module.exports = routes;