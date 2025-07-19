const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;
const BASE_URL = 'http://api.weatherstack.com';
const CACHE_KEY = 'weather_cache';

export async function fetchCurrentWeather(query: string) {
  const cached = localStorage.getItem(CACHE_KEY);
  const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);

  if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 1000 * 60 * 10) {
    return JSON.parse(cached);
  }

  const res = await fetch(
    `${BASE_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  if (data.error) throw new Error(data.error.info || 'WeatherStack API error');

  const result = {
    location: data.location.name,
    temperature: data.current.temperature,
    description: data.current.weather_descriptions[0],
    feelslike: data.current.feelslike,
    wind_speed: data.current.wind_speed,
    wind_dir: data.current.wind_dir,
    humidity: data.current.humidity,
    uv_index: data.current.uv_index,
    icon: data.current.weather_icons[0],
    date: new Date().toLocaleDateString(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(result));
  localStorage.setItem(`${CACHE_KEY}_time`, Date.now().toString());

  return result;
}
