import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Subscribe from "../ProductsCard/Subscribe";

const WhyChooseUs = [
  {
    id: 1,
    title: "Quality Insurance",
    description:
      "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
  },
  {
    id: 2,
    title: "Convenience",
    description:
      "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
  },
  {
    id: 3,
    title: "Exceptional Customer Service",
    description:
      "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
  },
];

const About = () => {
  return (
    <section className="flex flex-col gap-8 pt-6 mb-16 border-t border-zinc-300">
      <article className="flex items-center justify-center gap-2">
        <h1 className="flex gap-2 text-3xl font-mono text-zinc-500">
          About<span className="text-black">Us</span>
        </h1>
        <div className="border-2 w-10"></div>
      </article>
      <article className="flex  justify-between items-center">
        <div className="w-[36%]">
          <img
            src={assets.about_img}
            alt="about-img"
            className="w-full h-[62dvh]"
          />
        </div>
        <div className="w-[58%] flex flex-col gap-3 font-serif">
          <p className="text-md text-zinc-600">
            VogueVault was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-md text-zinc-600">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h1 className="text-lg font-bold text-black">Our Mission</h1>
          <p className="text-md text-zinc-600">
            Our mission at VogueVault is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </article>
      <article className="flex flex-col gap-4 mb-20">
        <div className="flex items-center gap-2">
          <h1 className="flex gap-2 text-[21px] font-normal font-mono text-zinc-500">
            WHY<span className="text-black">CHOOSE US</span>
          </h1>
          <div className="border-2 w-10"></div>
        </div>
        <div className="flex flex-wrap">
          {WhyChooseUs.map((item) => (
            <div
              key={item.id}
              className="w-1/3 flex flex-col gap-4 py-20
           px-20 text-sm border border-zinc-300"
            >
              <h1 className="font-bold">{item.title}</h1>
              <p className="text-zinc-500">{item.description}</p>
            </div>
          ))}
        </div>
      </article>
      <Subscribe/>
    </section>
  );
};

export default About;
