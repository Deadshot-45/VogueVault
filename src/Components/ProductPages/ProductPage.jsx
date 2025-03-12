import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { products } from "../../assets/frontend_assets/assets";
import ProductsCard from "./ProductsCard";
import { DataContext } from "../../Context/DataContext";
import {
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    productDetails,
    setProductDetails,
    setIsCart,
    setCart,
    cart,
    setCartCount,
    favorites,
    setFavorite,
  } = useContext(DataContext);
  const [isFavorate, setIsFavorate] = useState(false);
  const [size, setSize] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const product = products.find((p) => p.id === id);

        if (!isMounted) return;

        if (product) {
          setProductDetails(product);
          setIsLoading(false);
        } else {
          setError("Product not found");
          setIsLoading(false);
        }
      } catch (err) {
        if (!isMounted) return;
        setError("Error loading product");
        setIsLoading(false);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, setProductDetails]);

  useEffect(() => {
    if (productDetails) {
      const isInFavorites = favorites.some(
        (item) => item.id === productDetails.id
      );
      setIsFavorate(isInFavorites);
    }
  }, [productDetails, favorites]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
        <button
          onClick={() => navigate("/collection")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  if (!productDetails) {
    return null;
  }

  const handleAddToCart = () => {
    if (size) {
      const existingCart = cart.find(
        (product) => product.id === productDetails.id
      );
      const findSize = cart.find((itemSize) => itemSize.size === size);
      if (existingCart && findSize) {
        existingCart.quantity += 1;
      } else {
        cart.push({ ...productDetails, quantity: 1, size });
        setCartCount((count) => count + 1);
      }
      setCart([...cart]);
      setIsCart(true);
      setSize("");
    }
  };

  const handleFavorate = () => {
    setIsFavorate(!isFavorate);
    if (!isFavorate) {
      setFavorite([...favorites, productDetails]);
    } else {
      const filterFavorate = favorites.filter(
        (item) => item.id !== productDetails.id
      );
      setFavorite(filterFavorate);
    }
  };

  const RelatedProducts = products
    .filter((product) => product.subCategory === productDetails.subCategory)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={productDetails.image[selectedImage]}
              alt={productDetails.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productDetails.image?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  selectedImage === index ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={item}
                  alt={`${productDetails.name} view ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {productDetails.name}
            </h1>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${productDetails.price}
            </p>
          </div>

          <div className="prose prose-sm text-gray-500">
            <p>{productDetails.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
            <div className="mt-2 flex gap-2">
              {productDetails.sizes?.map((sizeOption) => (
                <button
                  key={sizeOption}
                  onClick={() => setSize(sizeOption)}
                  className={`px-4 py-2 rounded-md border ${
                    size === sizeOption
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!size}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md ${
                size
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={handleFavorate}
              className="p-3 rounded-md border border-gray-300 hover:border-black"
            >
              {isFavorate ? (
                <FaHeart className="h-5 w-5 text-red-500" />
              ) : (
                <FaRegHeart className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaTruck className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldAlt className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Secure Payment
                  </h4>
                  <p className="text-sm text-gray-500">100% secure payment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaExchangeAlt className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </h4>
                  <p className="text-sm text-gray-500">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RelatedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductsCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
