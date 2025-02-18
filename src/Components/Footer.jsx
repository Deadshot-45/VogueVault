import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="mb-6">
        <div className="flex justify-between border-b border-zinc-200 pb-5">
          <div className="w-[35%] flex flex-col gap-4">
            <a className="navbar-brand" href="#">
              <img src={assets.logo} alt="logo" className="w-32 h-8" />
            </a>
            <p className="text-zinc-700 text-[14px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">COMPANY</h2>
            <ul className="text-zinc-700 text-[13px] space-y-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Privacy Policy</a></li>

            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">GET IN TOUCH</h2>
            <ul className="text-zinc-700 text-[13px] space-y-4">
                <li><a href="#">+91 123-456-7890</a></li>
                <li><a href="#">forever@example.com</a></li>
                <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
       <div className="py-3">
        <p className="text-zinc-700 text-[15px] text-center">Copyright 2024@ mayanksahu - All Right Reserved.
            </p>
       </div>
    </footer>
  );
};

export default Footer;
