import React from "react";
import PropTypes from "prop-types";

const ProductsCard = ({ product }) => {
  return (
    <div className="responsive-container p-2">
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image[0]}
            alt={product.name}
            loading="lazy"
            className="responsive-image group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-4 space-y-1">
          <h2 className="text-responsive font-serif text-gray-600 line-clamp-2">
            {product.name}
          </h2>
          <p className="text-responsive font-semibold text-gray-500">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(ProductsCard);
