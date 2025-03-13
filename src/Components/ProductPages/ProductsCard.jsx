import React from 'react';

const ProductsCard = ({ product }) => {
  
  return (
    <div className="sm:w-[220px] sm:h-[320px] max-xs:h-auto max-xs:w-[130px] max-sm:min-xs:w-[190px] max-sm:min-xs:h-[290px] text-sm font-serif flex flex-col my-3 mx-auto cursor-pointer">
      <div className="sm:h-[250px] w-100% max-sm:min-xs:h-[230px] max-xs:h-[120px] overflow-hidden pb-3">
        <img
          src={product.image}
          alt={product.name} 
          loading="lazy"
          className="hover:scale-105 w-full h-full max-xs:h-[170px] duration-75 ease-in-out"
        />
      </div>
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductsCard;