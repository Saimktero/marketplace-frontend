import { Link } from 'react-router-dom';
import ProductList from "../components/ProductList";

export function Home({ productsData }) { 
    
    const popularProducts = (productsData?.results ?? []).slice(0, 4);
    return(
    <main>
        <section>
            <h1>Онлайн-маркетплейс anyways</h1>    
            <p>Онлайн-маркетплейс с товарами для дома, работы и повседневной жизни по доступным ценам.</p>
            <Link to='/products' className='btn'>Перейти в каталог</Link>
        </section>

        <section>
            <h2>Популярные товары</h2>
            {popularProducts.length > 0 ? (
                <ProductList products={popularProducts} />
            ) : (
              <p>Загрузка товаров...</p>
            )}
        </section>
    </main>
    );
}