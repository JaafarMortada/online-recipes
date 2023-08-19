<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shopping_lists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::create('shopping_list_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shopping_list_id');
            $table->unsignedBigInteger('recipe_id');
            $table->timestamps();
            $table->foreign('shopping_list_id')->references('id')->on('shopping_lists');
            $table->foreign('recipe_id')->references('id')->on('recipes');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shopping_lists');
        Schema::dropIfExists('shopping_list_items');
    }
};
