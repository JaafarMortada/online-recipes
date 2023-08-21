<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Cuisine;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\RecipesIngredients;
use App\Models\ShoppingList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function getRecipes($search = null, $value = null)
    {
        $user = Auth::user();
        if(is_null($user)){
            return response()->json(['message' => 'failed']);
        }
        if($search === "name"){
            $recipes = Recipe::where('name', 'LIKE', "%{$value}%")->get();
        } elseif ($search === "ingredient"){
            $ingredients = Ingredient::where('name', 'LIKE', "%{$value}%")->get();
            $recipes = [];
            foreach($ingredients as $ingredient){
                $recipes = $ingredient->recipes;
            }
        } elseif ($search === "cuisine"){
            $cuisines = Cuisine::where('name', 'LIKE', "%{$value}%")->get();
            $recipes = [];
            foreach($cuisines as $cuisine){
                $recipes = $cuisine->recipes;
            }
        } else {
            $recipes = Recipe::orderByDesc('id')->get();
        }

        foreach($recipes as $recipe){
            $recipe->likes_count = $recipe->likes->count();
            $recipe->comments_count = $recipe->comments->count();
            $recipe->ingredients;
            $recipe->cuisine;
            $recipe->images;
            $recipe->is_liked = $recipe->likes->contains('user_id', $user->id);
            $recipe->in_list = $recipe->likes->contains('user_id', $user->id);
            if($user->shoppingLists->isEmpty()){
                $shoppingList = new ShoppingList;
                $shoppingList->name = $user->name . "'s shopping List";
                $shoppingList->user_id = $user->id;
                $shoppingList->save();
            } else {
                $shoppingList = $user->shoppingLists;
            }
            if (empty($shoppingList[0])){
                $recipe->in_list = false;
            } else {
                $check_if_in_list = $shoppingList[0]->items->contains('recipe_id', $recipe->id);
                $recipe->in_list = $check_if_in_list;
            }
            unset($recipe->likes);
            unset($recipe->comments);
        }
        return response()->json(['recipes' => $recipes]);
    }

    public function createRecipe(Request $request)
    {
        $new_recipe = new Recipe;
        $new_recipe->user_id = Auth::id();
        $cuisine = Cuisine::where('name', $request->cuisine)->first();
        if(is_null($cuisine)){
            $cuisine = new Cuisine;
            $cuisine->name = $request->cuisine;
            $cuisine->save();
        }
        $cuisine_id = $cuisine->id;
        $new_recipe->name = $request->name;
        $new_recipe->cuisine_id = $cuisine_id;
        try{
            $new_recipe->save();
            foreach(json_decode($request->ingredients) as $ingredient){
                $db_ingredient = Ingredient::where('name', $ingredient->name)->first();
                if(is_null($db_ingredient) ){
                    $db_ingredient = new Ingredient;
                    $db_ingredient->name = $ingredient->name;
                    $db_ingredient->save();
                }
                $recipe_ingredient = new RecipesIngredients;
                $recipe_ingredient->recipe_id = $new_recipe->id;
                $recipe_ingredient->ingredient_id = $db_ingredient->id;
                $recipe_ingredient->amount = $ingredient->amount;
                try{
                    $recipe_ingredient->save();
                } catch (\Throwable $e) {
                    return response()->json(['status' => 'failed']);
                }
            }
            foreach ($request->file('image_url') as $recipe_image) {
                $file_name = time() . '_' . uniqid() . "_recipe_image." . $recipe_image->getClientOriginalExtension();
                $recipe_image->storeAs('public/recipes_images', $file_name);
                $recipe_image_db = new Image;
                $recipe_image_db->recipe_id = $new_recipe->id;
                $recipe_image_db->image_url = "recipes_images". "\\" .$file_name;
                $recipe_image_db->save();
            }
            return response()->json(['status' => 'success']);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'failed']);
        }
    }

    public function getComments($id){
        $recipe = Recipe::where('id', $id)->first();
        foreach($recipe->comments as $comment){
            $comment -> commenter = User::where('id', $comment->user_id)->pluck('name')->first();
            unset($comment->user_id);
            unset($comment->id);
            unset($comment->recipe_id);
        }
        return response()->json(['comments' => $recipe->comments]);
    }

    public function PostComment(Request $request){
        $new_comment = new Comment;
        $new_comment->user_id = Auth::id();
        $new_comment->recipe_id = $request->recipe_id;
        $new_comment->comment = $request->comment;
        try{
            $new_comment->save();
            return response()->json(['status' => 'success']);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'failed']);
        }
        
    }
}

