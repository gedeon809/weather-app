/**
 * Props for the WeatherCard component.
 * 
 * @typedef {Object} WeatherCardProps
 * @property {string} date - The date to display on the card.
 * @property {string} temperature - The temperature to display, as a string.
 * @property {string} icon - The URL or path to the weather icon image.
 * @property {string} description - A brief description of the weather.
 * @property {() => void} [onClick] - Optional click handler for the card.
 * @property {boolean} [isActive=false] - Whether the card is currently active/selected.
 */
interface WeatherCardProps {
  date: string;
  temperature: string;
  icon: string;
  description: string;
  onClick?: () => void;
  isActive?: boolean;
}

/**
 * A card component that displays weather information for a given date.
 * 
 * @param {WeatherCardProps} props - Props to configure the WeatherCard.
 * @returns {JSX.Element} The rendered WeatherCard component.
 */
const WeatherCard = ({
  date,
  temperature,
  icon,
  description,
  onClick,
  isActive = false,
}: WeatherCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer border hover:shadow-md transition duration-200
        ${isActive ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'}`}
    >
      <p className="text-sm font-semibold text-gray-700 mb-2">{date}</p>
      <div className="flex items-center justify-center mb-2">
        <img src={icon} alt={description} className="h-10 w-10 object-contain" />
      </div>
      <p className="text-xl font-bold text-center text-gray-800">{temperature}°C</p>
      <p className="text-sm text-center text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default WeatherCard;