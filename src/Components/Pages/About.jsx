import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Subscribe from "../ProductPages/Subscribe";

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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-800">
          About <span className="text-black">Us</span>
        </h1>
        <div className="w-20 h-1 bg-black mx-auto"></div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={assets.about_img}
            alt="About VogueVault"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">
              VogueVault was born out of a passion for innovation and a desire
              to revolutionize the way people shop online. Our journey began
              with a simple idea: to provide a platform where customers can
              easily discover, explore, and purchase a wide range of products
              from the comfort of their homes.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-800">Our Mission</h2>
            <p className="text-zinc-600 leading-relaxed">
              Our mission at VogueVault is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-zinc-800">
            Why <span className="text-black">Choose Us</span>
          </h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WhyChooseUs.map((item) => (
            <div
              key={item.id}
              className="p-8 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-zinc-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Subscribe />
    </div>
  );
};

export default About;
