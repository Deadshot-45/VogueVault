import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

const AddressDetails = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartTotal,
    gst,
    shipping,
    setShipping,
    totalPrice,
    setTotalPrice,
  } = useContext(DataContext);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    billingInfo[name] !== "" && setError(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in billingInfo) {
      if (billingInfo[key] === "") {
        setError(`Please fill ${key}`);
        return;
      }
    }
    if (paymentMethod === "card") {
      console.log("card");
    }
    if (paymentMethod === "upi") {
      console.log("upi");
    }
    if (paymentMethod === "netbanking") {
      console.log("netbanking");
    }
    // Add payment processing logic here
    // On successful payment, navigate to confirmation page
    // navigate("/payment/success");
  };
  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 mb-14">
      <article className="flex justify-center items-center gap-2 mb-4">
        <h1 className="font-bold text-3xl font-mono text-zinc-500">
          Address & <span className="text-zinc-700"> Payment Details</span>
        </h1>
        <div className="border-2 w-10"></div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Payment Methods and Billing Form */}
        <div className="md:col-span-2 space-y-8">
          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span>Net Banking</span>
              </label>
            </div>
          </div>
          {/* Billing Information */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={billingInfo.name}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={billingInfo.email}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={billingInfo.phone}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={billingInfo.city}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={billingInfo.state}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={billingInfo.pincode}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <p className="space-x-1">
                <span className="text-green-500 font-semibold">
                  {shipping ? "+" : "-"}
                </span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </p>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <p className="space-x-1">
                <span className="text-green-500 font-semibold">+</span>
                <span>₹{gst}</span>
              </p>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressDetails;
