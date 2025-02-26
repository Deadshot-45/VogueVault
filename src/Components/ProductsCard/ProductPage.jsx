import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { products } from "../../assets/frontend_assets/assets";
import ProductsCard from "./ProductsCard";
import { DataFile } from "../ContextFile/DataContext";

const ProductPage = ({}) => {
  const { productDetails, setProductDetails, setIsCart, setCart, cart } =
    useContext(DataFile);
  const handleAddToCart = () => {
    const existingCart = cart.find(
      (product) => product.id === productDetails.id
    );
    if (existingCart) {
      existingCart.quantity += 1;
    } else {
      cart.push({ ...productDetails, quantity: 1 });
    }
    setCart([...cart]);
    setIsCart(true);
  };
  const RelatedProducts = products
    .filter((product) => product.subCategory === productDetails.subCategory)
    .slice(0, 5);

  return (
    <>
      <section className="w-full flex flex-col gap-3 mb-20 mt-6">
        <article className="flex">
          <div className="w-[60%] flex gap-1">
            <div className="w-[23%] flex flex-col justify-between">
              {productDetails.image?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="product image"
                  className="h-[24%] w-[100%]
                    "
                />
              ))}
            </div>
            <div>
              <img
                src={productDetails.image[0]}
                alt={productDetails.name}
                className=" h-[60dvh]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">{productDetails.name}</h2>
            <p className="text-xl font-semibold text-black">
              ${productDetails.price}
            </p>
            <p className="text-md text-gray-600">
              {productDetails.description}
            </p>
            <p className="font-semibold">Select Sizes</p>
            <div className="flex gap-2">
              {productDetails.sizes?.map((size) => (
                <button
                  key={size}
                  className="py-2 px-4 bg-[#ebebeb] border border-white rounded-md "
                >
                  {size}
                </button>
              ))}
            </div>

            <div>
              <button
                onClick={handleAddToCart}
                className="bg-black text-white  font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
            <div className="w-[70%] flex flex-col gap-1 border-t-2 pt-2 border-zinc-300">
              <p>100% Original product.</p>

              <p>Cash on delivery is available on this product.</p>

              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </article>

        <article className="flex justify-center items-center gap-2 my-8">
          <h1 className="font-bold text-3xl font-mono text-zinc-500">
            BEST <span className="text-black">SELLERS</span>
          </h1>
          <div className="border-2 w-10"></div>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {RelatedProducts.map((product) => (
            <button key={product.id} onClick={() => setProductDetails(product)}>
              <Link to="/product">
                <ProductsCard product={product} key={product.id} />
              </Link>
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductPage;
