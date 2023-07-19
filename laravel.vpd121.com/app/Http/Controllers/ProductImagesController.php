<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Validator;

class ProductImagesController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"ProductImage"},
     *     path="/api/product_images",
     *     @OA\Response(response="200", description="Get All Product Images.")
     * )
     */
    public function index()
    {
        $product_images = ProductImage::get();

        return response()->json($product_images, 200, [
            'Content-Type' => 'application/json;charset=UTF-8',
            'Charset' => 'utf-8'
        ], JSON_UNESCAPED_UNICODE);
    }
    /**
     * @OA\Post(
     *     tags={"ProductImage"},
     *     path="/api/product_images",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={},
     *                 @OA\Property(
     *                     property="product_id",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="priority",
     *                     type="number"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Product.")
     * )
     */
    public function create(Request $request) {
        $input = $request->all();
        $message = array(
            'name.required'=>'Вкажіть назву картинки',
            'priority.required'=>'Вкажіть пріоритет картинки',
            'product_id.required'=>'Вкажіть ID продукту',
        );
        $validation = Validator::make($input, [
            'name'=>'required',
            'priority'=>'required',
            'product_id'=>'required',
        ], $message);

        if($validation->fails()) {
            return response()->json($validation->errors(), 400,
                ["Content-Type"=>"application/json;charset=UTF-8", "Charset" => "utf-8"], JSON_UNESCAPED_UNICODE);
        }
        $product = ProductImage::create($input);
        return response()->json($product, 201,
            ["Content-Type"=>"application/json;charset=UTF-8", "Charset" => "utf-8"], JSON_UNESCAPED_UNICODE);
    }
    /**
     * @OA\Delete(
     *     path="/api/product_images/{id}",
     *     tags={"ProductImage"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор Картинки",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успішне видалення картинки"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Картинку не знайдено"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Не авторизований"
     *     )
     * )
     */
    public function delete($id)
    {
        $product_image = ProductImage::findOrFail($id);
        $product_image->delete();
        return response()->json("Delete complete!", 200,
            ["Content-Type"=>"application/json;", "Charset"=>"UTF-8"], JSON_UNESCAPED_UNICODE);
    }
    /**
     * @OA\Get(
     *     tags={"ProductImage"},
     *     path="/api/product_images/{id}",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Ідентифікатор картинки",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *   security={{ "bearerAuth": {} }},
     *     @OA\Response(response="200", description="List Pictures."),
     * @OA\Response(
     *    response=404,
     *    description="Wrong id",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, wrong Picture Id has been sent. Pls try another one.")
     *        )
     *     )
     * )
     */
    public function getById($id)
    {
        $product_image = ProductImage::findOrFail($id);
        return response()->json($product_image, 200,
            ["Content-Type"=>"application/json;", "Charset"=>"UTF-8"], JSON_UNESCAPED_UNICODE);
    }
}
