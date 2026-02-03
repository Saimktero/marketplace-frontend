export function Home() { 
    return(
    <main>
        <section>    
            <p>Онлайн-маркетплейс с товарами для дома, работы и повседневной жизни по доступным ценам.</p>
            <Link to='/products' className='btn'>Перейти в каталог</Link>
        </section>

        <section>
            <h2>Популярные товары</h2>
            {/* 4 карточки */}
        </section>
    </main>
    );
}