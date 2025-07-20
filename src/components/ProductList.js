import Product from './Product';

function ProductList({ products, addToCart }) {
  console.log('Прилетели товары в ProductList:', products); // отладка
  return (
    <div>
      <ul>
        {products?.results?.length > 0 ? (
          products.results.map(product => (
            <Product
              key={product.id}
              name={product.name}
              addToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p>Загрузка товаров...</p>
        )}
       </ul>
    </div>
  );
}

export default ProductList;