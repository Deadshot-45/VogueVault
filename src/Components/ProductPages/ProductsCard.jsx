import React from 'react';

const ProductsCard = ({ product }) => {
  
  return (
    <div className="w-[220px] h-[320px] max-sm:w-[190px] max-sm:h-[290px] text-sm font-serif flex flex-col my-3 cursor-pointer">
      <div className="h-[250px] max-sm:h-[230px] overflow-hidden pb-3">
        <img
          src={product.image}
          alt={product.name} 
          className="hover:scale-105 w-full h-full duration-75 ease-in-out"
        />
      </div>
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductsCard;