<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

Route::get("recipes", [RecipeController::class, "getRecipes"]);
Route::post("comments", [RecipeController::class, "getComments"]);
Route::post("post_comment", [RecipeController::class, "PostComment"]);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});