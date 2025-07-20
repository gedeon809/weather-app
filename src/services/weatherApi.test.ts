import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fetchCurrentWeather } from './weatherApi';

beforeEach(() => {
  global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as any;
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        location: { name: 'Test City' },
        current: {
          temperature: 22,
          feelslike: 20,
          weather_descriptions: ['Cloudy'],
          weather_icons: ['icon.png'],
          wind_speed: 5,
          wind_dir: 'NE',
          humidity: 60,
          uv_index: 3,
        },
      }),
  })
) as any;

describe('fetchCurrentWeather', () => {
  it('returns valid weather data', async () => {
    const result = await fetchCurrentWeather('Test City');

    expect(result.temperature).toBe(22);
    expect(result.description).toBe('Cloudy');
    expect(result.icon).toBe('icon.png');
  });
});
