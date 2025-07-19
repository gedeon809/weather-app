// File: components/CurrentConditions.tsx
import React from 'react';

interface Props {
  temperature: number;
  description: string;
  feelslike: number;
  icon: string;
  wind: string;
  humidity: number;
  uv: number;
}

const DetailCard = ({ title, value, note }: { title: string; value: string; note?: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    {note && <p className="text-xs text-gray-500 dark:text-gray-400">{note}</p>}
  </div>
);

const CurrentConditions: React.FC<Props> = ({
  temperature,
  description,
  feelslike,
  icon,
  wind,
  humidity,
  uv,
}) => {
  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current Conditions</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-sm">
          <img src={icon} alt={description} className="w-12 h-12" />
          <div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{temperature}°</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description} - Feels like {feelslike}°</p>
          </div>
        </div>
        <DetailCard title="Wind" value={wind} />
        <DetailCard title="Humidity" value={`${humidity}%`} />
        <DetailCard
          title="UV Index"
          value={uv?.toString() || 'N/A'}
          note={uv != null ? (uv <= 2 ? 'Low' : uv <= 5 ? 'Moderate' : 'High') : undefined}
        />
      </div>
    </section>
  );
};

export default CurrentConditions;
