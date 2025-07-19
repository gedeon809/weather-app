interface WeatherCardProps {
  date: string;
  temperature: string;
  icon: string;
  description: string;
  onClick?: () => void;
  isActive?: boolean;
}

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
      className={`rounded-xl p-4 shadow-sm cursor-pointer border transition duration-200
        ${isActive ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-50'}`}
    >
      <p className="text-sm font-semibold text-gray-700 mb-1">{date}</p>
      <div className="flex items-center justify-center">
        <img src={icon} alt={description} className="h-10 w-10 object-contain" />
      </div>
      <p className="text-2xl font-bold text-center my-2">{temperature}°C</p>
      <p className="text-sm text-center text-gray-500">{description}</p>
    </div>
  );
};

export default WeatherCard;
