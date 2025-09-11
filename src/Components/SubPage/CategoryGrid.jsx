import { memo } from "react";
import PropTypes from 'prop-types';

const CategoryGrid = ({ subCategory, products, setFunc }) => {
  const handleCategoryFilter = (category) => {
    // Filter products based on subcategory
    const filteredProducts = products.filter(
      (product) => product.subCategory.toLowerCase() === category.toLowerCase()
    );
    setFunc(filteredProducts);
  };
  return (
    <>
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subCategory?.map((category) => {
            const firstProduct = products.find((product) => {
              return (
                product.subCategory.toLowerCase() === category.toLowerCase()
              );
            });
            return (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className="group relative overflow-hidden mx-auto rounded-lg"
              >
                <img
                  src={firstProduct?.image[0]}
                  alt={category}
                  loading="lazy"
                  className="w-full h-[400px] max-sm:min-xs:h-[15dvh] max-sm:w-[20dvh] max-xs:h-[18dvh] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-2xl max-xs:text-sm font-semibold">
                    {category}
                  </h2>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
};
CategoryGrid.propTypes = {
  subCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      subCategory: PropTypes.string.isRequired,
      image: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  setFunc: PropTypes.func.isRequired
};

export default memo(CategoryGrid);
