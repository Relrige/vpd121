<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});
Route::get("/category",[\App\Http\Controllers\CategoryController::class,'index']);
Route::post("/category",[\App\Http\Controllers\CategoryController::class,'create']);
Route::get("/category/{id}",[\App\Http\Controllers\CategoryController::class,'getById']);
Route::post("/category/edit/{id}",[\App\Http\Controllers\CategoryController::class,'edit']);
Route::delete("/category/{id}",[\App\Http\Controllers\CategoryController::class,'delete']);


Route::get("/product",[\App\Http\Controllers\ProductController::class,'index']);
Route::post("/product",[\App\Http\Controllers\ProductController::class,'create']);
Route::post("/product/edit/{id}",[\App\Http\Controllers\ProductController::class,'edit']);
Route::delete("/product/{id}",[\App\Http\Controllers\ProductController::class,'delete']);

Route::get("/product_images",[\App\Http\Controllers\ProductImagesController::class,'index']);
Route::post("/product_images",[\App\Http\Controllers\ProductImagesController::class,'create']);
Route::get("/product_images/{id}",[\App\Http\Controllers\ProductImagesController::class,'getById']);
Route::delete("/product_images/{id}",[\App\Http\Controllers\ProductImagesController::class,'delete']);
