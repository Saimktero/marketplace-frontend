import React from 'react';

function Product({ name, addToCart }) {
  return (
    <li className={className}>
      <p>{name}</p>
      <button onClick={addToCart}>Добавиь в корзину</button>
    </li>
  );
}

export default Product;
