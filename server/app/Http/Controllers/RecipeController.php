<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function getRecipes()
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
        return response()->json(['recipes' => $recipes]);
    }

    public function getComments(Request $request){
        $recipe = Recipe::where('id', $request->id)->first();
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

