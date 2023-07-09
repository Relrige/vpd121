@foreach($products as $product)
    <div class="product-card">
        <img src="{{ $product->image }}" alt="{{ $product->name }}">
        <h3>{{ $product->name }}</h3>
        <p>{{ $product->description }}</p>
        <p>Price: ${{ $product->price }}</p>
    </div>
@endforeach

