import React from "react";
import PropTypes from "prop-types";
import { getImageUrl } from "../../Utils/imageUrlHelper";

const ProductsCard = ({ product }) => {
  // Safely get the first image URL and transform it
  const imageUrl = product?.image?.[0]
    ? getImageUrl(product.image[0])
    : product?.image || "";

  return (
    <div className="responsive-container p-2">
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="responsive-image group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              console.error("Image failed to load:", imageUrl);
              e.target.src =
                "https://via.placeholder.com/400?text=Image+Not+Found";
            }}
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
