import React, { useEffect, useState } from "react";
import { assets, products } from "../assets/frontend_assets/assets";
import { NavigationLinks } from "./NavContent.jsx/NavigationLinks";
import { ActionButtons } from "./NavContent.jsx/ActionButtons";
import { Link } from "react-router-dom";

const NavBar = ({setProductDetails}) => {
  const [searchInput, setSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const ShowSearch = () => {
    setSearchInput(!searchInput);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
        setSearchResults(filteredProducts);
        console.log(filteredProducts);
    }
  }, [searchTerm]);

  return (
    <>
      <nav
        className={`flex justify-between w-full ${
          searchInput ? " pt-5" : "py-5"
        }`}
      >
        <Link className="w-40  h-10 relative" to="/">
          <img
            src={assets.VogueVault}
            alt="logo"
            className="h-[320%] w-full top-[-110%] absolute mix-blend-darken"
          />
        </Link>
        <NavigationLinks />
        <ActionButtons ShowSearch={ShowSearch} />
      </nav>
      {searchInput && (
        <section className="w-full flex flex-col justify-center relative">
          <article className="flex justify-center items-center pt-5">
            <div className="h-10 flex gap-2 justify-center items-center">
              <input
                type="search"
                name="search"
                placeholder="Search here....."
                onInput={(e) => handleSearch(e)}
                className="border w-[250px] rounded-4xl px-2 py-1"
              />
              <button type="button" onClick={ShowSearch}>
                <img src={assets.cross_icon} alt="cross" className="h-4" />
              </button>
            </div>
          </article>
          {searchResults && searchResults.map(items=>(
            <button key={items.id} onClick={() => setProductDetails(items)}  className="w-[300px] z-20 p-2 border mx-auto">
            <Link to='/product' className="flex gap-2">
              <img src={items.image[0]} alt="" className="w-[20%] h-12" />
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">{items.name}</h2>
                <p className="text-[10px]">{items.description.slice(0,30)}....</p>
              </div>
            </Link>
          </button>
          ))}
        </section>
      )}
    </>
  );
};

export default NavBar;
