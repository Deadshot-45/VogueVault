import React from 'react';

const ProductsCard = ({ product }) => {
  return (
    <div className="w-[220px] text-sm font-serif flex flex-col my-3">
      <div className="h-[250px] overflow-hidden pb-3">
        <img
          src={product.image}
          alt={product.name} // Add alt text for accessibility
          className="hover:scale-105 w-full h-full object-cover duration-75 ease-in-out"
        />
      </div>
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductsCard;