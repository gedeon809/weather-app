import { render, screen } from '@testing-library/react';
import CurrentConditions from './CurrentConditions';

describe('CurrentConditions Component', () => {
  it('renders all main weather data', () => {
    render(
      <CurrentConditions
        temperature={6}
        description="Overcast"
        feelslike={6}
        icon="https://cdn.weatherstack.com/weather_icons/overcast.png"
        wind="4 km/h (S)"
        humidity={100}
        uv={0}
      />
    );

    expect(screen.getByText(/Current Conditions/i)).toBeInTheDocument();
    expect(screen.getByText('6°')).toBeInTheDocument();
    expect(screen.getByText(/Overcast - Feels like 6°/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind/i)).toBeInTheDocument();
    expect(screen.getByText(/4 km\/h \(S\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/)).toBeInTheDocument();
    expect(screen.getByText(/UV Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Low/i)).toBeInTheDocument();
  });
});
