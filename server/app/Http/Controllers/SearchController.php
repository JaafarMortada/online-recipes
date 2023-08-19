<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function searchByName(Request $request){
        if(is_null(Auth::user())){
            return response()->json(['status' => 'failed']);
        }
        $recipes = Recipe::where('name', 'LIKE', "%{$request->name}%")->get();
        return response()->json(['recipes' => $recipes]);
    }

    public function searchByIngredient(Request $request){
        if(is_null(Auth::user())){
            return response()->json(['status' => 'failed']);
        }
        $ingredients = Ingredient::where('name', 'LIKE', "%{$request->name}%")->get();
        foreach($ingredients as $ingredient){
            $ingredient->recipes;
        }
        return response()->json(['recipes' => $ingredients]);
    }

    public function searchByCuisine(Request $request){
        if(is_null(Auth::user())){
            return response()->json(['status' => 'failed']);
        }
        $cuisines = Cuisine::where('name', 'LIKE', "%{$request->name}%")->get();
        foreach($cuisines as $cuisine){
            $cuisine->recipes;
        }
        return response()->json(['recipes' => $cuisines]);
    }
}
