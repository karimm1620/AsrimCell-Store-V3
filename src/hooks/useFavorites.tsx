import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("asrimcell-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (productId: number) => {
    const newFavorites = [...favorites, productId];
    setFavorites(newFavorites);
    localStorage.setItem("asrimcell-favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (productId: number) => {
    const newFavorites = favorites.filter((id) => id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem("asrimcell-favorites", JSON.stringify(newFavorites));
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
};
