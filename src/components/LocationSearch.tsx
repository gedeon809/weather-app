import { useEffect, useRef, useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';

const suggestions = [
  'Cape Town',
  'Johannesburg',
  'Durban',
  'Pretoria',
  'Randburg',
  'Port Elizabeth',
  'Bloemfontein',
  'East London',
  'Polokwane',
];

interface Props {
  defaultValue?: string;
}

export default function LocationSearch({ defaultValue = '' }: Props) {
  const { setLocation } = useWeatherStore();
  const [input, setInput] = useState(defaultValue);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setFiltered(
      suggestions.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSelect = (city: string) => {
    setInput(city);
    setShowDropdown(false);
    setLocation(city);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    if (input.trim()) {
      setLocation(input);
    }
  };

  return (
    <div ref={wrapperRef} className="relative max-w-sm w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter city..."
          className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-20 bg-white shadow-md rounded-md mt-1 w-full border overflow-hidden max-h-64 overflow-y-auto">
          {filtered.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}