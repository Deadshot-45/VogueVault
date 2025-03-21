import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets, products } from "../../assets/frontend_assets/assets";
import ProductsCard from "../ProductPages/ProductsCard";
import Subscribe from "../ProductPages/Subscribe";

const Home = () => {
  const recentProducts = products
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 10);
  const bestseller = products
    .filter((product) => product.bestseller)
    .map((product) => product)
    .slice(0, 5);
  return (
    <div className="space-y-16">
      <header className="relative h-[68dvh] lg:h-[40dvh] max-sm:h-[15dvh] sm:h-[30dvh] flex justify-between w-full fade-in">
        <div className="w-1/2 flex flex-col justify-center h-full">
          <article className="w-[60%] max-sm:w-[80%] sm:w-[70%] flex items-center mx-auto gap-2">
            <div className="border w-8"></div>
            <h1 className="font-bold text-xl max-sm:text-sm font-mono text-zinc-600">
              OUR BESTSELLERS
            </h1>
          </article>

          <h1 className="w-[60%] max-sm:w-[80%] sm:w-[70%] font-bold lg:text-[38px] sm:text-[32px] max-sm:text-xl font-mono mx-auto text-zinc-700">
            Latest Arrivals
          </h1>
          <article className="w-[60%] max-sm:w-[80%] sm:w-[70%] flex items-center gap-2 mx-auto mb-4">
            <h1 className="font-bold text-xl max-sm:text-sm font-mono text-zinc-600">
              SHOP NOW
            </h1>
            <div className="border w-10"></div>
          </article>
        </div>
        <div className="w-1/2 h-full">
          <img
            src={assets.hero_img}
            alt="hero img"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <section className="fade-in">
        <article className="flex justify-center items-center gap-3 mb-6">
          <h1 className="font-bold text-3xl max-sm:text-2xl font-mono text-zinc-500">
            LATEST <span className="text-black">COLLECTIONS</span>
          </h1>
          <div className="border-2 w-10"></div>
        </article>
        <article className="text-zinc-700 py-2 mb-8 max-sm:text-[12px] text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </article>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {recentProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`mx-auto card-mount delay-${index % 5}`}
            >
              <ProductsCard product={product} />
            </Link>
          ))}
        </div>
      </section>

      <section className="fade-in">
        <article className="flex justify-center items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl max-sm:text-2xl font-mono text-zinc-500">
            BEST <span className="text-black">SELLERS</span>
          </h1>
          <div className="border-2 w-10"></div>
        </article>
        <article className="text-zinc-700 py-2 mb-8 max-sm:text-[12px] text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </article>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {bestseller.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`mx-auto card-mount delay-${index % 5}`}
            >
              <ProductsCard product={product} />
            </Link>
          ))}
        </div>
      </section>

      <CompanyInfo />
      <Subscribe />
    </div>
  );
};

export default Home;

const CompanyInfo = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
      <article className="text-center min-h-[120px] px-2 py-6 flex flex-col items-center">
        <img
          src={assets.exchange_icon}
          alt="exchange-img"
          loading="lazy"
          className="h-12 w-12 max-sm:w-10 max-sm:h-10 mb-2"
        />
        <h2 className="font-semibold text-md max-sm:text-[12px]">
          Easy Exchange Policy
        </h2>
        <p className="text-zinc-500 text-sm max-sm:text-[12px] text-center">
          We offers hassle free exchange Policy
        </p>
      </article>
      <article className="text-center min-h-[120px] px-2 py-6 flex flex-col items-center">
        <img
          src={assets.quality_icon}
          alt="return-policy"
          loading="lazy"
          className="h-12 w-12 max-sm:w-11 max-sm:h-11 mb-2"
        />
        <h2 className="font-semibold text-md max-sm:text-sm">
          7 days return policy
        </h2>
        <p className="text-zinc-500 text-sm max-sm:text-[12px] text-center">
          We offers 7 days free return Policy
        </p>
      </article>
      <article className="text-center min-h-[120px] px-2 py-6 flex flex-col items-center">
        <img
          src={assets.support_img}
          alt="customer-care"
          className="h-10 w-10 max-sm:w-9 max-sm:h-9 mb-2"
        />
        <h2 className="font-semibold text-md max-sm:text-sm">
          Best Customer Support
        </h2>
        <p className="text-zinc-500 text-sm max-sm:text-[12px] text-center">
          We support 24/7 customer support
        </p>
      </article>
    </section>
  );
};
