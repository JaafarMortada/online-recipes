<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CalenderController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ShoppingListController;

Route::get("recipes/{search?}/{value?}", [RecipeController::class, "getRecipes"]);
Route::get("comments/{id}", [RecipeController::class, "getComments"]);
Route::post("post_comment", [RecipeController::class, "PostComment"]);
Route::post("create_recipe", [RecipeController::class, "createRecipe"]);
Route::post("search_by_name", [SearchController::class, "searchByName"]);
Route::post("search_by_ingredient", [SearchController::class, "searchByIngredient"]);
Route::post("search_by_cuisine", [SearchController::class, "searchByCuisine"]);
Route::post("like", [LikeController::class, "like"]);
Route::post("unlike", [LikeController::class, "unlike"]);
Route::get("get_plans", [CalenderController::class, "getPlans"]);
Route::post("set_plan", [CalenderController::class, "setPlan"]);
Route::post("add_to_list", [ShoppingListController::class, "addToList"]);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});