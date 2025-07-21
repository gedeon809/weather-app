import { create } from 'zustand';

interface CurrentWeather {
  location: string;
  temperature: number;
  description: string;
  feelslike: number;
  wind_speed: number;
  wind_dir: string;
  humidity: number;
  uv_index: number;
  icon: string;
  date: string;
}

interface WeatherDay {
  date: string;
  temperature: number;
  icon: string;
  description: string;
}

interface WeatherStore {
  loading: boolean;
  error: string | null;
  weather: WeatherDay[];
  currentWeather: CurrentWeather | null;
  selectedDay: number | null;
  location: string;
  setWeather: (data: WeatherDay[]) => void;
  setCurrentWeather: (data: CurrentWeather) => void;
  setLoading: (val: boolean) => void;
  setError: (msg: string | null) => void;
  selectDay: (index: number) => void;
  setLocation: (val: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  loading: false,
  error: null,
  weather: [],
  currentWeather: null,
  selectedDay: null,
  location: 'Johannesburg',

  setWeather: (data) => set({ weather: data }),
  setCurrentWeather: (data) => set({ currentWeather: data }),
  setLoading: (val) => set({ loading: val }),
  setError: (msg) => set({ error: msg }),
  selectDay: (index) => set({ selectedDay: index }),
  setLocation: (val) => set({ location: val }),
}));
