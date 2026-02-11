import Product from './Product';

function ProductList({ products, addToCart }) {
  if (!products || products.length === 0) return <p>Загрузка товаров...</p>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Product
            name={product.name}
            addToCart={() => addToCart(product)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
