import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

test('renders WeatherCard with props', () => {
  render(
    <WeatherCard
      date="Today"
      temperature="22"
      icon="https://example.com/icon.png"
      description="Sunny"
    />
  );

  expect(screen.getByText(/Today/i)).toBeInTheDocument();
  expect(screen.getByText(/22°C/i)).toBeInTheDocument();
  expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('icon.png'));
});
