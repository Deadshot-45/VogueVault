import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets, products } from "../../assets/frontend_assets/assets";
import ProductsCard from "../ProductsCard/ProductsCard";
import Subscribe from "../ProductsCard/Subscribe";
import { DataFile } from "../ContextFile/DataContext";

const Home = () => {
  const { setProductDetails } = useContext(DataFile);
  const recentProducts = products
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 10);
  const bestseller = products
    .filter((product) => product.bestseller)
    .map((product) => product)
    .slice(0, 5);

  return (
    <>
      <header className="h-[68dvh] flex justify-between w-full mb-14 z-10 top-0">
        <div className="w-1/2 flex flex-col justify-center h-full border">
          <article className="w-[60%] flex items-center mx-auto gap-2">
            <div className="border w-10"></div>
            <h1 className="font-bold text-xl font-mono text-zinc-600">
              OUR BESTSELLERS
            </h1>
          </article>

          <h1 className="w-[60%] font-bold text-[38px] font-mono mx-auto text-zinc-700">
            Latest Arrivals
          </h1>
          <article className="w-[60%] flex items-center gap-2  mx-auto mb-4">
            <h1 className="font-bold text-xl font-mono text-zinc-600">
              SHOP NOW
            </h1>
            <div className="border w-10"></div>
          </article>
        </div>
        <div className="w-1/2 h-full">
          <img src={assets.hero_img} alt="hero img" className="h-full w-full" />
        </div>
      </header>
      <section className="mb-12">
        <article className="flex justify-center items-center gap-2 mb-4">
          <h1 className="font-bold text-3xl font-mono text-zinc-500">
            LATEST <span className="text-black">COLLECTIONS</span>
          </h1>
          <div className="border-2 w-10"></div>
        </article>
        <article className="text-zinc-700 py-2 mb-6 text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-center">
          {recentProducts.map((product) => (
            <button key={product.id} onClick={() => setProductDetails(product)}>
              <Link to="/product">
                <ProductsCard product={product} key={product.id} />
              </Link>
            </button>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <article className="flex justify-center items-center gap-2 mb-4">
          <h1 className="font-bold text-3xl font-mono text-zinc-500">
            BEST <span className="text-black">SELLERS</span>
          </h1>
          <div className="border-2 w-10"></div>
        </article>
        <article className="text-zinc-700 py-2 mb-6 text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {bestseller.map((product) => (
            <button key={product.id} onClick={() => onShowProduct(product)}>
              <ProductsCard product={product} />
            </button>
          ))}
        </div>
      </section>
      <section className="mb-16 flex justify-evenly w-full">
        <article className="flex flex-col justify-center items-center gap-2">
          <img
            src={assets.exchange_icon}
            alt="exchange-img"
            className="h-12 w-12 mb-2"
          />
          <h2 className="font-semibold text-md">Easy Exchange Policy</h2>
          <p className="text-zinc-500 text-sm">
            We offers hassle free exchange Policy
          </p>
        </article>
        <article className="flex flex-col justify-center items-center">
          <img
            src={assets.quality_icon}
            alt="return-policy"
            className="h-12 w-12 mb-2"
          />
          <h2 className="font-semibold text-md">7 days return policy</h2>
          <p className="text-zinc-500 text-sm">
            We offers 7 days free return Policy
          </p>
        </article>
        <article className="flex flex-col justify-center items-center">
          <img
            src={assets.support_img}
            alt="customer-care"
            className="h-10 w-10 mb-2"
          />
          <h2 className="font-semibold text-md">Best Customer Support</h2>
          <p className="text-zinc-500 text-sm">
            We support 24/7 customer support
          </p>
        </article>
      </section>
      <Subscribe />
    </>
  );
};

export default Home;
