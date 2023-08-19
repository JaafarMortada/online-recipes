<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function getRecipes(Request $request)
    {
        $recipes = Recipe::all();
        foreach($recipes as $recipe){
            $recipe->likes_count = $recipe->likes->count();
            $recipe->comments_count = $recipe->comments->count();
            $recipe->ingredients;
            $recipe->cuisine;
            unset($recipe->likes);
            unset($recipe->comments);

        }
        return response()->json(['message' => $recipes]);
    
}
}

