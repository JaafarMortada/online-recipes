<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeCommentController extends Controller

{
    public function like(Request $request){
        $like = new Like;
        $like->recipe_id = intval($request->recipe_id);
        $user_id = Auth::id();
        if(is_null($user_id) || is_null(Recipe::where('id', $request->recipe_id)->first())){
            return response()->json(["status" => "failed"]);
        }
        $like->user_id = $user_id;
        $like->save();
        return response()->json(["status" => "success"]);
    }
    public function unlike(Request $request)
    {
        $user_id = Auth::id();
        $recipe = Recipe::where('id', $request->recipe_id)->first();
        if(is_null($user_id) || is_null($recipe)){
            return response()->json(["status" => "failed"]);
        }
        $existingLike = Like::where('user_id', $user_id)->where('recipe_id', $request->recipe_id)->first();
        $existingLike->delete();
        return response()->json(['status' => 'success']);
    }
}