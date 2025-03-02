import React, { useContext, useState,useEffect } from "react";
import { DataFile } from "../ContextFile/DataContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useContext(DataFile);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(cart[0]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart]);

  return (
    <section className="w-full mb-16 mt-10 space-y-7">
      <article className="w-[60%] flex items-center gap-2">
        <h1 className="font-bold flex gap-1 text-2xl font-mono text-zinc-500">
          <p>Your</p>
          <span className="text-black">Cart</span>
        </h1>
        <div className="border w-10"></div>
      </article>
      {cart &&
        cart.map((product) => (
          <article key={product.id+Math.floor(Math.random()*10)} className="flex flex-col">
            <aside className="flex flex-wrap justify-between">
              <div className="flex flex-wrap gap-10">
                <Link to={'/Product'} className="w-[120px] h-[120px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                  />
                </Link>
                <div className="flex flex-col flex-wrap">
                  <p className="text-lg font-mono">{product.name}</p>
                  <p className="text-sm text-zinc-800 font-mono text-wrap">
                    {product.description.slice(0, 70)}...
                  </p>
                  <p className="text-zinc-800 text-sm font-mono">
                    Size : {product?.size}
                  </p>
                  <p className="text-zinc-800 text-sm font-mono">
                    ${product.price}
                  </p>
                  <p className="text-zinc-800 text-sm font-mono">
                    quantity : {product.quantity}
                  </p>
                </div>
              </div>
              <p className="text-lg w-[20%] font-mono">
                ${product.price * product.quantity}
              </p>
            </aside>
          </article>
        ))}

      <CartTotal totalPrice={totalPrice} />
    </section>
  );
};

export default Cart;

const CartTotal = ({ totalPrice }) => {
  const shippingFee = 10.00;
  const total = totalPrice + shippingFee;

  return (
    <article className="flex justify-end">
      <aside className="flex flex-col gap-2 w-[350px] px-6">
        <div className="w-[60%] flex items-center gap-2">
          <h1 className="font-bold flex gap-1 text-xl font-mono text-zinc-500">
            <p>Cart</p>
            <span className="text-black">Totals</span>
          </h1>
          <div className="border w-10"></div>
        </div>
        <div className="flex justify-between text-zinc-950 text-[13px] border-b border-zinc-400 py-1">
          <p>SubTotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-zinc-950 text-[13px] border-b border-zinc-400 py-1">
          <p>ShippingFee</p>
          <p>${shippingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-zinc-950 text-[13px] font-bold border-zinc-400 py-1">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-end">
          <button className="bg-black text-white py-2 px-8">
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </article>
  );
};