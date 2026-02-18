import Product from './Product';

function ProductList({
  products,
  addToCart,
  cartItems,
  increaseQuantity,
  decreaseQuantity
}) {
  if (!products || products.length === 0) {
    return <p>Загрузка товаров...</p>;
  }

  return (
    <ul className="products-grid">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          addToCart={addToCart}
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
    </ul>
  );
}

export default ProductList;
