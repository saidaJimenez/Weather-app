import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherService";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city, units);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city = null) => {
   
    if (city === null) {
      setFavorites([]); 
    } else {
      setFavorites(favorites.filter((fav) => fav !== city));
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
    favorites,
    addFavorite,
    removeFavorite,
    units,
    setUnits,
  };
};


