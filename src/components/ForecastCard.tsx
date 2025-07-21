interface ForecastCardProps {
  date: string;
  dayTemp: number;
  nightTemp: number;
  iconDay: string;
  iconNight: string;
  description: string;
  wind: string;
  humidity: number;
  uv: number;
  precip: number;
}

const ForecastCard = ({
  date,
  dayTemp,
  nightTemp,
  iconDay,
  iconNight,
  description,
  wind,
  humidity,
  uv,
  precip,
}: ForecastCardProps) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">{date}</h3>
    <div className="flex items-center gap-2 mb-2">
      <img src={iconDay} alt="Day icon" className="w-6 h-6" />
      <span className="text-sm text-gray-700">Day: {dayTemp}°</span>
      <img src={iconNight} alt="Night icon" className="w-6 h-6" />
      <span className="text-sm text-gray-700">Night: {nightTemp}°</span>
    </div>
    <div className="text-xs text-gray-600 space-y-1">
      <p>Wind: {wind}</p>
      <p>Humidity: {humidity}%</p>
      <p>UV Index: {uv} ({uv <= 2 ? 'Low' : uv <= 5 ? 'Moderate' : 'High'})</p>
      <p>Precipitation: {precip}%</p>
    </div>
  </div>
);

export default ForecastCard;
