import React from "react";

function Pagination({ totalCount, pageSize, currentPage, onPageChange, pages }) {
  if (currentPage === 0 || pages.length < 2) return null;

  const last = pages[pages.length - 1];
  const prev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const next = () => currentPage < last && onPageChange(currentPage + 1);

  return (
    <ul>
      <li onClick={prev} aria-disabled={currentPage === 1}>«</li>
      {pages.map((p, i) =>
        p === "DOTS" ? (
          <li key={`dots-${i}`}>…</li>
        ) : (
          <li
            key={p}
            className={p === currentPage ? "selected" : ""}
            aria-current={p === currentPage ? "page" : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </li>
        )
      )}
      <li onClick={next} aria-disabled={currentPage === last}>»</li>
    </ul>
  );
}

export default Pagination;