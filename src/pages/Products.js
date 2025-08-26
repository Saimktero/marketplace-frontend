import React from "react";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

function Products({ products, addToCart, loadPage }) {
  const pageSize = products?.page_size || 12;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalCount = products?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // обработчик смены страницы
  const onPageChange = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setCurrentPage(next);
    loadPage(next, pageSize);
  };

  // массив страниц: [1,2,...,totalPages]
  const pages = React.useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  return (
    <div>
      <h2>Каталог товаров</h2>
      <ProductList products={products} addToCart={addToCart} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          pages={pages}
        />
      )}
    </div>
  );
}

export default Products;