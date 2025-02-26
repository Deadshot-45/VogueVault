import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mb-10">
        <div className="flex justify-between border-b border-zinc-200 pb-10">
          <div className="w-[35%] flex flex-col gap-4">
            <Link className="w-40 h-12 relative" to='/'>
              <img src={assets.VogueVault} alt="logo" className="h-[320%] w-full top-[-150%] absolute mix-blend-darken" />
            </Link>
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
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>About Us</Link></li>
                <li><Link to={'/'}>Delivery</Link></li>
                <li><Link to={'/'}>Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">GET IN TOUCH</h2>
            <ul className="text-zinc-700 text-[13px] space-y-4">
                <li><a href='tel:+91-123-456-7890'>+91 123-456-7890</a></li>
                <li><a href='mailto:VogueVault@example.com'>VogueVault@example.com</a></li>
                <li>Instagram</li>
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
