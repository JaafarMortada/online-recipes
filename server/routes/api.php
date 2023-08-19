<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\SearchController;

Route::get("recipes", [RecipeController::class, "getRecipes"]);
Route::post("comments", [RecipeController::class, "getComments"]);
Route::post("post_comment", [RecipeController::class, "PostComment"]);
Route::post("create_recipe", [RecipeController::class, "createRecipe"]);
Route::post("search_by_name", [SearchController::class, "searchByName"]);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});