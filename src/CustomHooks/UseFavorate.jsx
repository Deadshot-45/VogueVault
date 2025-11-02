import { useState, useEffect } from "react";

const useSetFavorate = (initialProduct) => {
  const [isFavorate, setIsFavorate] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      try {
        const savedFavorites = JSON.parse(
          localStorage.getItem("favorate") || "[]"
        );
        // Ensure savedFavorites is an array
        const favoritesArray = Array.isArray(savedFavorites)
          ? savedFavorites
          : [];
        setIsFavorate(
          favoritesArray.some((item) => item._id === initialProduct._id)
        );
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setIsFavorate(false);
      }
    }
  }, [initialProduct]);

  const handleFavorateFunc = (productToToggle, favorites, setFavorite) => {
    // Ensure favorites is an array
    const favoritesArray = Array.isArray(favorites) ? favorites : [];

    const isProductFavorated = favoritesArray.some(
      (item) => item._id === productToToggle._id
    );

    if (isProductFavorated) {
      // Remove from favorites
      const filterFavorate = favoritesArray.filter(
        (item) => item._id !== productToToggle._id
      );
      setFavorite(filterFavorate);
      setIsFavorate(false);
    } else {
      // Add to favorites
      setFavorite([...favoritesArray, { ...productToToggle, favorate: true }]);
      setIsFavorate(true);
    }
  };

  return { isFavorate, handleFavorateFunc };
};

export default useSetFavorate;
