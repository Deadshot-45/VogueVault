import React from "react";

const Delivery = () => {
  return (
    <section className="w-full py-8 mb-10">
      <article className="flex justify-center items-center gap-2 mb-4">
        <h1 className="font-bold text-3xl font-mono text-zinc-500">
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

      <article className="flex flex-wrap gap-4 items-center text-zinc-700 p-4">
        <div className="w-[48%] h-[270px] p-10 space-y-2 border border-zinc-400 rounded-lg">
          <h2 className="text-xl font-semibold">Shipping Methods</h2>
          <ul className="list-disc space-y-2 px-4">
            <li>Standard Delivery (3-5 business days)</li>
            <li>Express Delivery (1-2 business days)</li>
            <li>Same Day Delivery (selected areas only)</li>
          </ul>
        </div>

        <div className="w-[48%] h-[270px] p-10 space-y-2 border border-zinc-400 rounded-lg">
          <h2 className="text-xl font-semibold">Delivery Times</h2>
          <ul className="list-disc space-y-2 px-4">
            <li>Monday to Friday: 9:00 AM - 8:00 PM</li>
            <li>Saturday: 10:00 AM - 6:00 PM</li>
            <li>Sunday: Delivery not available</li>
          </ul>
        </div>

        <div className="w-[48%] h-[270px] p-10 space-y-2 border border-zinc-400 rounded-lg">
          <h2 className="text-xl font-semibold">Shipping Costs</h2>
          <ul className="list-disc space-y-2 px-4">
            <li>Standard Delivery: Free for orders above ₹999</li>
            <li>Express Delivery: Additional ₹100</li>
            <li>Same Day Delivery: Additional ₹200</li>
          </ul>
        </div>

        <div className="w-[48%] min-h-[270px] p-10 space-y-2 border border-zinc-400 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Contact</h2>
        <p>
          For any delivery-related queries, please contact our customer support:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Email: support@voguevault.com</li>
          <li>Phone: 1800-123-4567 (Toll-free)</li>
          <li>Available: Monday to Saturday, 9 AM to 6 PM</li>
        </ul>
      </div>
      </article>

      
    </section>
  );
};

export default Delivery;
