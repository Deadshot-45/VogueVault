import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Subscribe from "../ProductPages/Subscribe";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-800">
          Contact <span className="text-black">Us</span>
        </h1>
        <div className="w-20 h-1 bg-black mx-auto"></div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={assets.contact_img}
            alt="Contact VogueVault"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="space-y-8">
          {/* Store Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-800">Our Store</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl text-zinc-600 mt-1" />
                <div>
                  <p className="text-zinc-600">123 Main St,</p>
                  <p className="text-zinc-600">Anytown, USA 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl text-zinc-600" />
                <p className="text-zinc-600">+91 123-456-7890</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl text-zinc-600" />
                <p className="text-zinc-600">info@voguevault.com</p>
              </div>
            </div>
          </div>

          {/* Careers Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-800">
              Careers at VogueVault
            </h2>
            <p className="text-zinc-600">
              Join our team and be part of something extraordinary. We're always
              looking for talented individuals who share our passion for
              innovation and customer service.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
              Explore Jobs
            </button>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-800">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
          <div className="space-y-2">
            <p className="text-zinc-600">Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p className="text-zinc-600">Saturday: 10:00 AM - 6:00 PM</p>
            <p className="text-zinc-600">Sunday: Closed</p>
          </div>
        </div>

        <div className="p-8 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <div className="space-y-2">
            <p className="text-zinc-600">Email: support@voguevault.com</p>
            <p className="text-zinc-600">Phone: 1800-123-4567</p>
            <p className="text-zinc-600">Available: 24/7</p>
          </div>
        </div>

        <div className="p-8 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="space-y-2">
            <p className="text-zinc-600">VogueVault Headquarters</p>
            <p className="text-zinc-600">123 Business Street</p>
            <p className="text-zinc-600">Mumbai, India 400001</p>
          </div>
        </div>
      </section>

      <Subscribe />
    </div>
  );
};

export default Contact;
