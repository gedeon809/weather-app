import { useEffect, useRef, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import CurrentConditions from "../components/CurrentConditions";
import LocationSearch from "../components/LocationSearch";
import ForecastCard from "../components/ForecastCard";
import { useWeatherStore } from "../store/useWeatherStore";
import { fetchCurrentWeather } from "../services/weatherApi";

/**
 * Simulates a 5-day basic forecast based on current weather.
 * Used to populate the WeatherCard components.
 *
 * @param {any} current - The current weather object.
 * @returns {Array} Array of simplified forecast objects.
 */
function simulateForecast(current: any): any[] {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    result.push({
      date: date.toDateString(),
      temperature: current.temperature + Math.floor(Math.random() * 5 - 2),
      icon: current.icon,
      description: current.description,
    });
  }
  return result;
}

/**
 * Simulates a 5-day detailed forecast with extended metrics.
 * Used to populate the ForecastCard components.
 *
 * @param {any} current - The current weather object.
 * @returns {Array} Array of detailed forecast objects.
 */
function simulateDetailedForecast(current: any): any[] {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    result.push({
      date: date.toDateString(),
      dayTemp: current.temperature + Math.floor(Math.random() * 4),
      nightTemp: current.temperature - Math.floor(Math.random() * 4),
      iconDay: current.icon,
      iconNight: current.icon,
      description: current.description,
      wind: `${current.wind_speed} km/h`,
      humidity: current.humidity,
      uv: current.uv_index,
      precip: Math.floor(Math.random() * 30),
    });
  }
  return result;
}

/**
 * HomePage component renders the weather dashboard including:
 * - Location search
 * - Current weather conditions
 * - 5-day simplified forecast
 * - 5-day detailed forecast with interaction
 *
 * Allows clicking forecast cards to update and scroll to the Current Conditions.
 */
function HomePage() {
  const {
    weather,
    setWeather,
    currentWeather,
    setCurrentWeather,
    loading,
    setLoading,
    error,
    setError,
    selectedDay,
    selectDay,
    location,
    setLocation,
  } = useWeatherStore();

  const [forecast, setForecast] = useState<any[]>([]);
  const [activeConditions, setActiveConditions] = useState<any | null>(null);

  const currentConditionsRef = useRef<HTMLDivElement>(null);

  /**
   * Fetches and sets the current weather and simulated forecasts
   * when the location changes.
   */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const current = await fetchCurrentWeather(location);
        setCurrentWeather(current);
        setWeather(simulateForecast(current));
        const simulatedDetails = simulateDetailedForecast(current);
        setForecast(simulatedDetails);
        setActiveConditions(current);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [location]);

  /**
   * Handles user clicking on a detailed forecast card.
   * Updates the Current Conditions section with that day's data,
   * and scrolls into view.
   *
   * @param {any} dayData - The selected day's forecast data.
   */
  const handleDetailedCardClick = (dayData: any) => {
    setActiveConditions({
      temperature: dayData.dayTemp,
      feelslike: dayData.dayTemp - 1,
      description: dayData.description,
      icon: dayData.iconDay,
      wind: dayData.wind,
      humidity: dayData.humidity,
      uv: dayData.uv,
      high: dayData.dayTemp + 2,
      low: dayData.nightTemp,
    });

    currentConditionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentWeather?.location || "Weather Forecast"}
        </h1>
        <LocationSearch
          onSearch={(city) => setLocation(city)}
          defaultValue={location}
        />
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div ref={currentConditionsRef}>
        {activeConditions && (
          <div className="relative">
            <CurrentConditions
              temperature={activeConditions.temperature}
              description={activeConditions.description}
              feelslike={activeConditions.feelslike}
              icon={activeConditions.icon}
              wind={activeConditions.wind}
              humidity={activeConditions.humidity}
              uv={activeConditions.uv}
              high={activeConditions.high}
              low={activeConditions.low}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setActiveConditions(currentWeather)}
                className="text-sm text-blue-600 hover:text-blue-800 underline transition flex items-center gap-1"
              >
                <span>🔄</span> Back to Current Conditions
              </button>
            </div>
          </div>
        )}
      </div>

      <section className="bg-blue-100 rounded-xl p-6 mt-10 mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {weather.map((day, index) => (
            <WeatherCard
              key={index}
              date={day.date}
              temperature={day.temperature.toString()}
              icon={day.icon}
              description={day.description}
              onClick={() => selectDay(index)}
              isActive={selectedDay === index}
            />
          ))}
        </div>
      </section>

      <section className="bg-blue-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Detailed Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {forecast.map((day, i) => (
            <div
              key={i}
              onClick={() => handleDetailedCardClick(day)}
              className="cursor-pointer"
            >
              <ForecastCard
                date={day.date}
                dayTemp={day.dayTemp}
                nightTemp={day.nightTemp}
                iconDay={day.iconDay}
                iconNight={day.iconNight}
                description={day.description}
                wind={day.wind}
                humidity={day.humidity}
                uv={day.uv}
                precip={day.precip}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
