import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    
    if (error.response) {
      
      console.error("Error en la API:", error.response.data);
      throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else if (error.request) {
  
      console.error("No hay respuesta del servidor:", error.request);
      throw new Error("No hay respuesta del servidor. Verifica tu conexión.");
    } else {
      
      console.error("Error inesperado:", error.message);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};

getWeatherByCity("Madrid")
  .then(data => console.log(data))
  .catch(err => console.error(err.message));
