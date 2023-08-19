<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingListItem extends Model
{
    protected $table = 'Shopping_list_items';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    use HasFactory;

    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
