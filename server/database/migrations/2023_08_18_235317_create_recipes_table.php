<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('cuisines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('cuisine_id');
            $table->string('name');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('cuisine_id')->references('id')->on('cuisines');
        });
        Schema::create('recipes_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recipe_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->string('amount');
            $table->timestamps();
            $table->foreign('recipe_id')->references('id')->on('recipes');
            $table->foreign('ingredient_id')->references('id')->on('ingredients');
        });
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recipe_id');
            $table->text('image_url');
            $table->timestamps();
            $table->foreign('recipe_id')->references('id')->on('recipes');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cuisines');
        Schema::dropIfExists('ingredients');
        Schema::dropIfExists('recipes_ingredients');
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('images');
    }
};
