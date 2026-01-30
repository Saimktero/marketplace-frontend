import React from "react";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination/Pagination";

function Products({ products, addToCart, loadPage }) {
  const pageSize = 10; 
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalCount = products?.count ?? 0;
 
  // обработчик смены страницы
  const onPageChange = (page) => {
    setCurrentPage(page);
    loadPage(page, pageSize);
  };
 
  return (
    <div>
      <h2>Каталог товаров</h2>
      <ProductList products={products?.results || []} addToCart={addToCart} />

      {totalCount > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        
        />
      )}
    </div>
  );
}

export default Products;