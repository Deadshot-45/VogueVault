import { useContext, useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ProductsCard from "./ProductsCard";
import {
  FaExchangeAlt,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useProductQuery } from "../../Hooks/UseProductQuery";
import { DataContext } from "../../Context/DataContext";
import { AuthContext } from "../../Context/AuthContext";
import useGetSingleProduct from "../../Hooks/useGetSingleProduct";
import useAddToCart from "../../Hooks/UseAddToCart";
import useUpdateFavorite from "../../Hooks/UpdateFav";

const ProductPage = () => {
  // URL and navigation
  const { id } = useParams();

  // Context values
  const { isLoggedIn } = useContext(AuthContext);
  const {
    productDetails,
    setProductDetails,
    setIsCart,
    setCart,
    cart,
    setCartCount,
    setFavorite,
  } = useContext(DataContext);

  // Local state
  const [size, setSize] = useState("");
  const [isFavorate, setIsFavorate] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState([]);

  // Custom hooks
  const { favoriteState, updateFavorite } = useUpdateFavorite();
  const { addToCart, itemAdded } = useAddToCart();
  const { getSingleProduct, product } = useGetSingleProduct();
  const { data } = useProductQuery(productDetails?.subCategory);
  // Product fetching and state updates
  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      const recentstProducts = data.filter((item) => item._id !== id);

      setRelatedProducts(recentstProducts.slice(0, 8));
    }
  }, [data, id]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image[0]);
      setProductDetails(product);
    }
  }, [product, setProductDetails]);

  // Favorites update
  useEffect(() => {
    if (favoriteState.success && favoriteState.itemAdded) {
      const updatedFavorites = Array.isArray(favoriteState.itemAdded)
        ? favoriteState.itemAdded
        : [favoriteState.itemAdded];
      setFavorite(updatedFavorites);
    }
  }, [favoriteState.success, favoriteState.itemAdded, setFavorite]);

  // Cart update
  useEffect(() => {
    if (!itemAdded) return;
    const cartData = Array.isArray(itemAdded) ? itemAdded : [itemAdded];
    setCart((prevCart) => {
      const newCart =
        typeof cartData[0] === "object"
          ? [...prevCart, ...cartData[0]]
          : [...prevCart, ...cartData];
      return newCart;
    });
  }, [itemAdded, setCart]);
  const handleAddToCart = useCallback(() => {
    if (!size?.trim()) return;

    const newProduct = {
      _id: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      image: [...productDetails.image],
      description: productDetails.description,
      size: size.trim(),
      stock: productDetails.stock,
      quantity: 1,
      favorate: false,
      category: productDetails.category,
      subCategory: productDetails.subCategory,
    };

    if (isLoggedIn) {
      addToCart(newProduct, isLoggedIn);
      setSize("");
      setIsCart(true);
      return;
    }

    if (!Array.isArray(cart)) {
      setCart([]);
      return;
    }

    const existingProduct = cart.find(
      (item) => item._id === productDetails._id && item.size === size
    );

    try {
      if (existingProduct) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productDetails._id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        localStorage.setItem(
          "cart",
          JSON.stringify(
            cart.map((item) =>
              item._id === productDetails._id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          )
        );
        toast.success("Product quantity updated in cart!");
      } else {
        setCart((prevCart) => [...prevCart, newProduct]);
        localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
        setCartCount((prev) => prev + 1);
        toast.success("Product added successfully!");
      }

      console.log("Product added to cart:", newProduct);
      setIsCart(true);
      setSize("");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [
    productDetails,
    size,
    isLoggedIn,
    cart,
    addToCart,
    setCart,
    setCartCount,
    setIsCart,
  ]);

  const handleFavorate = useCallback(() => {
    if (!isLoggedIn) {
      toast.error("Please login to add product to favorite");
      return;
    }

    const token = localStorage.getItem("token");
    const productData = {
      _id: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      image: [...productDetails.image],
      description: productDetails.description,
      size: size?.trim() || "",
      stock: productDetails.stock,
      quantity: 1,
      favorate: !isFavorate,
      category: productDetails.category,
      subCategory: productDetails.subCategory,
    };

    setIsFavorate(!isFavorate);
    updateFavorite(token, productData);
  }, [productDetails, size, isFavorate, isLoggedIn, updateFavorite]);

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <img
                src={selectedImage}
                alt={productDetails.name}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productDetails.image?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                    selectedImage === index ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={item}
                    loading="lazy"
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
                    <p className="text-sm text-gray-500">
                      30 days return policy
                    </p>
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
          <div className="grid grid-cols-2 sm:max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {RelatedProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <ProductsCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
