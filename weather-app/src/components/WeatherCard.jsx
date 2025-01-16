import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const WeatherCard = ({ weather, addFavorite, units, setUnits }) => {
  const unitLabel = units === "metric" ? "°C" : "°F";
  const unitOptions = [
    { label: "Celsius (°C)", value: "metric" },
    { label: "Fahrenheit (°F)", value: "imperial" },
  ];

  return (
    <Card className="w-80 text-center shadow-lg">
      <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather-icon"
        className="mx-auto"
      />
      <p className="text-xl">{weather.weather[0].description}</p>
      <p className="text-3xl font-semibold">{weather.main.temp}{unitLabel}</p>
      <div className="flex justify-between mt-4">
        <Dropdown value={units} options={unitOptions} onChange={(e) => setUnits(e.value)} />
        <Button label=" Favorito" icon="pi pi-star" onClick={() => addFavorite(weather.name)} />
      </div>
    </Card>
  );
};

export default WeatherCard;
