import React from "react";

interface Props {
  temperature: number;
  description: string;
  feelslike: number;
  icon: string;
  wind: string;
  humidity: number;
  uv: number;
  high: number;
  low: number;
}

/**
 * A small detail display card used inside the Current Conditions layout.
 *
 * @param {Object} props - Props for the DetailCard component.
 * @param {string} props.title - The title label for the metric.
 * @param {string} props.value - The main value to display.
 * @param {string} [props.note] - Optional extra note (e.g., description).
 * @param {string} [props.icon] - Optional icon to visually represent the metric.
 * @returns {JSX.Element} Rendered card UI block.
 */
const DetailCard = ({
  title,
  value,
  note,
  icon,
}: {
  title: string;
  value: string;
  note?: string;
  icon?: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
    <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
    <p className="text-xl font-bold text-gray-900">{value}</p>
    {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    {icon && <img src={icon} alt={title} className="w-6 h-6 mt-2" />}
  </div>
);

/**
 * Displays current weather conditions including temperature,
 * wind, humidity, and UV index, styled with cards and icons.
 *
 * @component
 * @param {Props} props - Component props
 * @param {number} props.temperature - Current temperature in degrees
 * @param {string} props.description - Weather description (e.g., "Sunny")
 * @param {number} props.feelslike - "Feels like" temperature
 * @param {string} props.icon - URL or path to weather icon image
 * @param {string} props.wind - Wind speed and direction
 * @param {number} props.humidity - Humidity percentage
 * @param {number} props.uv - UV index
 * @param {number} props.high - High temperature forecast
 * @param {number} props.low - Low temperature forecast
 * @returns {JSX.Element} Rendered weather overview UI
 */
const CurrentConditions: React.FC<Props> = ({
  temperature,
  description,
  feelslike,
  icon,
  wind,
  humidity,
  uv,
  high,
  low,
}) => {
  return (
    <section className="bg-blue-100 rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Current Conditions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-gray-900">{temperature}°</p>
            <p className="text-sm text-gray-600">
              {description}{" "}
              <span className="text-xs">Feels like {feelslike}°</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              High: {high}° • Low: {low}°
            </p>
          </div>
          <img src={icon} alt={description} className="w-12 h-12" />
        </div>

        <DetailCard title="Wind" value={wind} note="Breeze level & direction" />
        <DetailCard
          title="Humidity"
          value={`${humidity}%`}
          note="Dew point 6°"
        />
        <DetailCard
          title="UV Index"
          value={uv?.toString() || "N/A"}
          note={uv <= 2 ? "Low" : uv <= 5 ? "Moderate" : "High"}
        />
        <div></div>
      </div>
    </section>
  );
};

export default CurrentConditions;
