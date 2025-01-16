import { useWeather } from "../hook/useWeather";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Home = () => {
  const {
    weather,
    loading,
    error,
    fetchWeather,
    favorites,
    addFavorite,
    removeFavorite,
    units,
    setUnits,
  } = useWeather();

  const [showFavoritesPanel, setShowFavoritesPanel] = useState(true);

  const handleSearch = async (city) => {
    try {
      await fetchWeather(city);
    } catch {
      toast.error("No se encontró la ciudad. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex mt-10">
      
      {showFavoritesPanel && favorites.length > 0 && (
        <div className="w-1/4 bg-gray-100  p-4 rounded-lg ml-6 shadow-lg mr-6 relative flex flex-col items-center">

          <FavoritesList
            favorites={favorites}
            removeFavorite={removeFavorite}
            fetchWeather={fetchWeather}
          />
          <button
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            onClick={() => setShowFavoritesPanel(false)}
          >
            <i className="pi pi-times text-black"></i>
          </button>
        </div>
      )}

      {/* Botón para mostrar el panel de favoritos si está oculto */}
      {!showFavoritesPanel && favorites.length > 0 && (
        <button
          className="absolute left-4 top-4 bg-gray-200 text-gray-800 font-bold p-2 rounded-lg shadow-md hover:bg-gray-300"
          onClick={() => setShowFavoritesPanel(true)}
        >
          Favoritos
        </button>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col items-center flex-grow">
        {/* Título centrado con la tarjeta */}
        <h1 className="text-4xl font-bold mb-6 text-center">Clima Actual</h1>

        {/* Barra de búsqueda */}
        <div className="w-full max-w-md mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Estado de carga o error */}
        {loading && <p className="mt-4 text-gray-500">Cargando...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Tarjeta del clima */}
        {weather && (
          <div className="w-full max-w-md mb-12">
            <WeatherCard
              weather={weather}
              addFavorite={addFavorite}
              units={units}
              setUnits={setUnits}
            />
          </div>
        )}
      </div>

      {/* Notificaciones */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Home;
