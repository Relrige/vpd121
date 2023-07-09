<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\Response(response="200", description="Get All Products.")
     * )
     */
    public function index()
    {
        $products = Product::with('product_images')->get();

        return response()->json($products, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }
    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={},
     *                 @OA\Property(
     *                     property="price",
     *                     type="int"
     *                 ),
     *              @OA\Property(
     *                     property="category_id",
     *                     type="int"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="images[]",
     *                     type="array",
     *                     @OA\Items(type="file")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Product.")
     * )
     */
    public function create(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'images' => 'array', // Додаткова перевірка для масиву фото
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $product = Product::create($request->except('images'));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = $image->getClientOriginalName();
                $image->move(public_path('product_images'), $imageName);

                $product->product_images()->create([
                    'name' => $imageName,
                    'priority' => 0, // Налаштуйте пріоритет фото за потребою
                ]);
            }
        }

        $product->load('product_images');

        return response()->json($product, 201);
    }
    /**
     * @OA\Post(
     *     tags={"Product"},
     *     path="/api/product/edit/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор product",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"name"},
     *                 @OA\Property(
     *                     property="price",
     *                     type="int"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="category_id",
     *                     type="int"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function edit(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $input = $request->all();
        $message = array(
            'name.required'=>"Вкажіть назву продукта",
            'description.required'=>"Вкажіть опис продукта",
        );
        $validator = Validator::make($input,[
            'name'=>'required',
            'description'=>'required'
        ], $message);
        if($validator->fails()) {
            return response()->json($validator->errors(), 400,
                ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        }

        $product->update($input);

        return response()->json($product, 200);
    }
    /**
     * @OA\Delete(
     *     path="/api/product/{id}",
     *     tags={"Product"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор продукта",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успішне видалення Продукта"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Продукт не знайдено"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Не авторизований"
     *     )
     * )
     */
    public function delete(Product $product, $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return 204;
    }
}
