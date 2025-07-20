# 🌤️ Weather Forecast App

A React + TypeScript weather app built for the FSE take-home project. Displays current weather, 3-day forecast, and 3-day history using the WeatherStack API.

## 🚀 Features

- ✅ Current weather display (temp, wind, humidity, UV)
- ✅ 3-day history & 3-day forecast (simulated)
- ✅ Zustand for state management
- ✅ Responsive Tailwind CSS layout
- ✅ Interactive selection of days
- ✅ Weather caching via `localStorage`
- ✅ API error handling
- ✅ Fully typed with TypeScript

## 📦 Technologies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [WeatherStack API](https://weatherstack.com/)
- [Vitest + Testing Library](https://vitest.dev/)

## 🛠️ Setup

```bash
# Clone the repo
git clone https://github.com/your-username/weather-app.git
cd weather-app

# Install dependencies
npm install

# Add your API key
echo \"VITE_WEATHERSTACK_API_KEY=your_key_here\" > .env

# Start the dev server
npm run dev
