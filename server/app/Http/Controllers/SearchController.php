<?php

namespace App\Http\Controllers;

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

}
