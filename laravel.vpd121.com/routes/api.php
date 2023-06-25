<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/category",[\App\Http\Controllers\CategoryController::class,'index']);
Route::post("/category",[\App\Http\Controllers\CategoryController::class,'create']);
Route::get("/category/{id}",[\App\Http\Controllers\CategoryController::class,'getById']);
Route::post("/category/edit/{id}",[\App\Http\Controllers\CategoryController::class,'edit']);
Route::delete("/category/{id}",[\App\Http\Controllers\CategoryController::class,'delete']);
