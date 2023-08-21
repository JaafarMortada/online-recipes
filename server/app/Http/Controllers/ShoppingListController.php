<?php

namespace App\Http\Controllers;

use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShoppingListController extends Controller
{
    public function addToList(Request $request){
        $user = Auth::user();
        $recipe_id = $request->recipe_id;
        if($user->shoppingLists->isEmpty()){
            $shoppingList = new ShoppingList;
            $shoppingList->name = $user->name . "'s shopping List";
            $shoppingList->user_id = $user->id;
            $shoppingList->save();
        } else {
            $shoppingList = $user->shoppingLists;
        }
        $check_if_in_list = $shoppingList[0]->items->contains('recipe_id', $recipe_id);
        if($check_if_in_list){
            return response()->json(['message' => 'item already in the list']);
        }
        $new_list_item = new ShoppingListItem;
        $new_list_item->recipe_id = $recipe_id;
        $new_list_item->shopping_list_id = $shoppingList[0]->id;
        $new_list_item->save();
        return response()->json(['message' => 'item added successfully']);
    }

    public function getListItems(){
        
    }
}
