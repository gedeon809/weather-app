import { useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import CurrentConditions from '../components/CurrentConditions';
import { useWeatherStore } from '../store/useWeatherStore';
import { fetchCurrentWeather } from '../services/weatherApi';

function simulateForecast(current: any): any[] {
  const result = [];
  for (let i = -3; i <= 2; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    result.push({
      date: date.toDateString(),
      temperature: current.temperature + Math.floor(Math.random() * 5 - 2),
      icon: current.icon,
      description: i === 0 ? current.description + ' (Today)' : current.description,
    });
  }
  return result;
}

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
} = useWeatherStore();

useEffect(() => {
  if (weather.length > 0 && currentWeather) return; // ✅ prevent duplicate calls

  const load = async () => {
    try {
      setLoading(true);
      const current = await fetchCurrentWeather('Cape Town');
      setCurrentWeather(current);
      setWeather(simulateForecast(current));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

return (
  <div className="p-4 sm:p-8 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Weather Forecast</h1>

    {loading && <p className="text-blue-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {/* ✅ Move CurrentConditions outside the grid */}
    {currentWeather && (
      <CurrentConditions
        temperature={currentWeather.temperature}
        description={currentWeather.description}
        feelslike={currentWeather.feelslike}
        icon={currentWeather.icon}
        wind={`${currentWeather.wind_speed} km/h (${currentWeather.wind_dir})`}
        humidity={currentWeather.humidity}
        uv={currentWeather.uv_index}
      />
    )}

    {/* ✅ Forecast grid below */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
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
  </div>
);

}

export default HomePage;
