import React from "react";

const Delivery = () => {
  const deliveryInformation = [
    {
      head: "Shipping Method",
      body1: "Standard (3-5 business days)",
      body2: "Standard (1-2 business days)",
      body3: "Standard (selected area only)",
    },
    {
      head: "Delivery Times",
      body1: "Monday To Friday : 9:00 AM - 8:00 PM",
      body2: "Saturday : 10:00 AM - 6:00 PM",
      body3: "Sunday : Delivery not available",
    },
    {
      head: "Shipping Cost",
      body1: "Standad : Free for orders above ₹999",
      body2: "Express : Additional ₹100",
      body3: "Same Day : Additional ₹200",
    },
    {
      head: "Customer Support",
      body1: "support@voguevault.com",
      body2: "1800-123-4567 (Toll-free)",
      body3: "Monday to Saturday, 9 AM to 6 PM",
    },
  ];
  return (
    <section className="mx-auto py-8 mb-10">
      <article className="flex justify-center items-center gap-2 mb-4">
        <h1 className="font-bold text-3xl max-sm:text-2xl font-mono text-zinc-500">
          Delivery <span className="text-black">Information</span>
        </h1>
        <div className="border-2 w-10"></div>
      </article>

      <article className="flex flex-wrap gap-4 items-center text-zinc-700 p-4">
        <h2 className="text-xl font-semibold mb-3">Tracking Your Order</h2>
        <p>
          Once your order is shipped, you will receive a tracking number via
          email and SMS. You can use this number to track your order on our
          website or through our delivery partner's website.
        </p>
      </article>

      <article className="flex flex-wrap gap-4 items-center text-zinc-700 p-4">
        <h2 className="text-xl font-semibold mb-3">Delivery Areas</h2>
        <p>
          We currently deliver to all major cities in India. For remote areas,
          additional delivery time and charges may apply. Please check your
          pincode during checkout for delivery availability.
        </p>
      </article>

      <article className="flex flex-wrap max-[600px]:flex-col gap-4 items-center text-zinc-700 p-4">
        {deliveryInformation.map((item, index) => (
          <div
            key={index}
            className="max-sm:w-full min-h-[200px] sm:min-w-[400px] max-sm:p-6 p-10 space-y-2 border border-zinc-400 rounded-lg"
          >
            <h2 className="text-xl font-semibold">{item.head}</h2>
            <ul className="list-disc space-y-2 px-4 text-zinc-600 text-[16px] font-serif">
              <li>{item.body1}</li>
              <li>{item.body2}</li>
              <li>{item.body3}</li>
            </ul>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Delivery;
