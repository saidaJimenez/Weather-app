import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";

const FavoritesList = ({ favorites, removeFavorite, fetchWeather }) => {
  
  const clearFavorites = () => {
    removeFavorite(); 
  };

  return (
    <div className="mt-6 w-80">
      <h3 className="text-xl font-semibold mb-2">     
         <i className="pi pi-star text-yellow-500 mr-2" /> 
            Ciudades Favoritas
     </h3>
      <ListBox
        value={favorites}
        options={favorites.map(city => ({ label: city, value: city }))}
        onChange={(e) => fetchWeather(e.value)} 
        className="w-full"
      />
      
      <Button
        icon="pi pi-times"
        
        label=" Borrar Todas"
        className="mt-2 text-red-600"
        severity="danger"
        onClick={clearFavorites}
      />
    </div>
  );
};

export default FavoritesList;

