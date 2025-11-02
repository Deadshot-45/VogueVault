import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    window.location.reload();
  };

  const companyLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "Delivery",
      link: "/delivery",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
  ];
  return (
    <footer className="bg-white mt-16">
      <div className="mx-auto px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="block w-48">
              <img
                src={"https://vault-vogue-expressjs.vercel.app/VogueVault.png"}
                alt="VogueVault Logo"
                className="h-12 w-auto mix-blend-multiply"
              />
            </Link>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Company</h2>
            <ul className="space-y-2">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`${item.link}`}
                    className="text-zinc-600 hover:text-black transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Get in Touch</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+91-123-456-7890"
                  className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
                >
                  <FaPhone className="text-sm" />
                  +91 123-456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:VogueVault@example.com"
                  className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
                >
                  <FaEnvelope className="text-sm" />
                  VogueVault@example.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
                >
                  <FaInstagram className="text-lg" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Newsletter</h2>
            <p className="text-zinc-600 text-sm">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-xm:w-[50%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="max-xm:w-[40%] px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-zinc-600 text-sm">
            Copyright © 2024 VogueVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
