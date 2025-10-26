import p_img1 from "./p_img1.png";
import p_img2_1 from "./p_img2_1.png";
import p_img2_2 from "./p_img2_2.png";
import p_img2_3 from "./p_img2_3.png";
import p_img2_4 from "./p_img2_4.png";
import p_img3 from "./p_img3.png";
import p_img4 from "./p_img4.png";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.png";
import p_img7 from "./p_img7.png";
import p_img8 from "./p_img8.png";
import p_img9 from "./p_img9.png";
import p_img10 from "./p_img10.png";
import p_img11 from "./p_img11.png";
import p_img12 from "./p_img12.png";
import p_img13 from "./p_img13.png";
import p_img14 from "./p_img14.png";
import p_img15 from "./p_img15.png";
import p_img16 from "./p_img16.png";
import p_img17 from "./p_img17.png";
import p_img18 from "./p_img18.png";
import p_img19 from "./p_img19.png";
import p_img20 from "./p_img20.png";
import p_img21 from "./p_img21.png";
import p_img22 from "./p_img22.png";
import p_img23 from "./p_img23.png";
import p_img24 from "./p_img24.png";
import p_img25 from "./p_img25.png";
import p_img26 from "./p_img26.png";
import p_img27 from "./p_img27.png";
import p_img28 from "./p_img28.png";
import p_img29 from "./p_img29.png";
import p_img30 from "./p_img30.png";
import p_img31 from "./p_img31.png";
import p_img32 from "./p_img32.png";
import p_img33 from "./p_img33.png";
import p_img34 from "./p_img34.png";
import p_img35 from "./p_img35.png";
import p_img36 from "./p_img36.png";
import p_img37 from "./p_img37.png";
import p_img38 from "./p_img38.png";
import p_img39 from "./p_img39.png";
import p_img40 from "./p_img40.png";
import p_img41 from "./p_img41.png";
import p_img42 from "./p_img42.png";
import p_img43 from "./p_img43.png";
import p_img44 from "./p_img44.png";
import p_img45 from "./p_img45.png";
import p_img46 from "./p_img46.png";
import p_img47 from "./p_img47.png";
import p_img48 from "./p_img48.png";
import p_img49 from "./p_img49.png";
import p_img50 from "./p_img50.png";
import p_img51 from "./p_img51.png";
import p_img52 from "./p_img52.png";

import logo from "./logo.png";
import hero_img from "./hero_img.png";
import cart_icon from "./cart_icon.png";
import bin_icon from "./bin_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import profile_icon from "./profile_icon.png";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_img from "./support_img.png";
import menu_icon from "./menu_icon.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import cross_icon from "./cross_icon.png";
import VogueVault from "./VogueVault.png";

export const assets = {
  VogueVault,
  logo,
  hero_img,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_dull_icon,
  star_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
};

const convertDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const products = [
  {
    id: 1,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: p_img1,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716634345448),
    displayDate: convertDate(1716634345448),
  },
  {
    id: 2,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 3,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    image: p_img3,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716234545448),
    displayDate: convertDate(1716234545448),
  },
  {
    id: 4,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    image: p_img4,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 5,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    image: p_img5,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 6,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    image: p_img6,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716623423448),
    displayDate: convertDate(1716623423448),
  },
  {
    id: 7,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    image: p_img7,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716621542448),
    displayDate: convertDate(1716621542448),
  },
  {
    id: 8,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    image: p_img8,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 9,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: p_img9,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621235448),
    displayDate: convertDate(1716621235448),
  },
  {
    id: 10,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    image: p_img10,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716622235448),
    displayDate: convertDate(1716622235448),
  },
  {
    id: 11,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    image: p_img11,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 12,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    image: p_img12,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 13,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    image: p_img13,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716234545448),
    displayDate: convertDate(1716234545448),
  },
  {
    id: 14,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    image: p_img14,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 15,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    image: p_img15,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 16,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    image: p_img16,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716623423448),
    displayDate: convertDate(1716623423448),
  },
  {
    id: 17,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    image: p_img17,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716621542448),
    displayDate: convertDate(1716621542448),
  },
  {
    id: 18,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    image: p_img18,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 19,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    image: p_img19,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621235448),
    displayDate: convertDate(1716621235448),
  },
  {
    id: 20,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    image: p_img20,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716622235448),
    displayDate: convertDate(1716622235448),
  },
  {
    id: 21,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    image: p_img21,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 22,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    image: p_img22,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 23,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    image: p_img23,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716234545448),
    displayDate: convertDate(1716234545448),
  },
  {
    id: 24,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    image: p_img24,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 25,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    image: p_img25,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 26,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    image: p_img26,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716623423448),
    displayDate: convertDate(1716623423448),
  },
  {
    id: 27,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    image: p_img27,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716621542448),
    displayDate: convertDate(1716621542448),
  },
  {
    id: 28,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    image: p_img28,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 29,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    image: p_img29,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621235448),
    displayDate: convertDate(1716621235448),
  },
  {
    id: 30,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    image: p_img30,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716622235448),
    displayDate: convertDate(1716622235448),
  },
  {
    id: 31,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    image: p_img31,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 32,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    image: p_img32,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 33,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 360,
    image: p_img33,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716234545448),
    displayDate: convertDate(1716234545448),
  },
  {
    id: 34,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 370,
    image: p_img34,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 35,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 380,
    image: p_img35,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 36,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 390,
    image: p_img36,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716623423448),
    displayDate: convertDate(1716623423448),
  },
  {
    id: 37,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 400,
    image: p_img37,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716621542448),
    displayDate: convertDate(1716621542448),
  },
  {
    id: 38,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 410,
    image: p_img38,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 39,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 420,
    image: p_img39,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621235448),
    displayDate: convertDate(1716621235448),
  },
  {
    id: 40,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 430,
    image: p_img40,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716622235448),
    displayDate: convertDate(1716622235448),
  },
  {
    id: 41,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 440,
    image: p_img41,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 42,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 450,
    image: p_img42,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 43,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 460,
    image: p_img43,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716234545448),
    displayDate: convertDate(1716234545448),
  },
  {
    id: 44,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 470,
    image: p_img44,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
  {
    id: 45,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 480,
    image: p_img45,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 46,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 490,
    image: p_img46,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716623423448),
    displayDate: convertDate(1716623423448),
  },
  {
    id: 47,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 500,
    image: p_img47,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716621542448),
    displayDate: convertDate(1716621542448),
  },
  {
    id: 48,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 510,
    image: p_img48,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 49,
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 520,
    image: p_img49,
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621235448),
    displayDate: convertDate(1716621235448),
  },
  {
    id: 50,
    name: "Men Tapered Fit Flat-Front Trousers",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 530,
    image: p_img50,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    date: new Date(1716622235448),
    displayDate: convertDate(1716622235448),
  },
  {
    id: 51,
    name: "Women Round Neck Cotton Top",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 540,
    image: p_img51,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: new Date(1716622345448),
    displayDate: convertDate(1716622345448),
  },
  {
    id: 52,
    name: "Men Round Neck Pure Cotton T-shirt",
    description:
      "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 550,
    image: p_img52,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: new Date(1716621345448),
    displayDate: convertDate(1716621345448),
  },
];
