import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Subscribe from "../ProductsCard/Subscribe";

const Contact = () => {
  return (
    <section className="w-full flex flex-col gap-8 justify-center items-center pt-6 border-t border-zinc-300">
      <article className="flex items-center justify-center gap-2">
        <h1 className="flex gap-2 text-[26px] font-mono text-zinc-500">
          Contact<span className="text-black">Us</span>
        </h1>
        <div className="border-2 w-10"></div>
      </article>
      <article className="flex gap-10 mb-20 px-6">
        <div className="w-[55%]">
          <img
            src={assets.contact_img}
            alt="contact-img"
            className="w-full h-[65dvh]"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 text-zinc-500">
          <h2 className="text-2xl font-mono text-gray-700 font-bold">Our Store</h2>
          <div className="flex flex-col">
            <p>123 Main St,</p>
            <p>Anytown, USA 12345</p>
          </div>
          <div className="flex flex-col">
            <p>Phone: 555-555-5555</p>
            <p>Email: info@yourstore.com</p>
          </div>
          <h2 className="text-2xl font-mono text-gray-700 font-bold">Carrers at VogueVault</h2>
          <p>Learn more about our teams and job openings.</p>
          <button type="button" className="max-w-fit py-4 px-8 text-sm border text-gray-800">
            Explore Jobs
          </button>
        </div>
      </article>
      <Subscribe/>
    </section>
  );
};

export default Contact;
