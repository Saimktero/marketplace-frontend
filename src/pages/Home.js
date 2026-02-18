import { Link } from 'react-router-dom';
import ProductList from "../components/ProductList";

export function Home({ 
  popularProducts = [],
  addToCart,
  cartItems,
  increaseQuantity,
  decreaseQuantity
 }) { 
    const top4 = popularProducts.slice(0, 4);

    return(
    <main>
        <section>
            <h1>Онлайн-маркетплейс anyways</h1>    
            <p>Онлайн-маркетплейс с товарами для дома, работы и повседневной жизни по доступным ценам.</p>
            <Link to='/products' className='btn'>Перейти в каталог</Link>
        </section>

        <section>
            <h2>Популярные товары</h2>
            {top4.length > 0 ? (
                <ProductList
                    products={top4}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                />
            ) : (
              <p>Загрузка товаров...</p>
            )}
        </section>
    </main>
    );
}