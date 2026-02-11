import Product from './Product';

function ProductList({ products, addToCart }) {
  if (!products || products.length === 0) return <p>Загрузка товаров...</p>;

  return (
    <ul className="products-grid">
      {products.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            addToCart={() => addToCart(product)}
          />
      ))}
    </ul>
  );
}

export default ProductList;
