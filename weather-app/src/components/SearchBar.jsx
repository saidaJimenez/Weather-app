import { useState, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = useCallback(() => {
    if (city.trim() !== "") {
      onSearch(city);
    }
  }, [city, onSearch]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <InputText
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Ingresa una ciudad"
        className="p-inputtext-lg w-60"
      />
      <Button 
        label="Buscar" 
        icon="pi pi-search" 
        onClick={handleSearch} 
        disabled={city.trim() === ""} 
      />
    </div>
  );
};

export default SearchBar;
