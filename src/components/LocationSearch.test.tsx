import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationSearch from './LocationSearch';
import { useWeatherStore } from '../store/useWeatherStore';

vi.mock('../store/useWeatherStore');

describe('LocationSearch', () => {
  const setLocationMock = vi.fn();

  beforeEach(() => {
    setLocationMock.mockReset();

    (useWeatherStore as unknown as () => { setLocation: typeof setLocationMock }).mockReturnValue({
      setLocation: setLocationMock,
    });
  });

  it('renders input with default value', () => {
    render(<LocationSearch defaultValue="Durban" />);
    expect(screen.getByPlaceholderText(/enter city/i)).toHaveValue('Durban');
  });

  it('filters suggestions based on input and shows dropdown', async () => {
    render(<LocationSearch />);
    const input = screen.getByPlaceholderText(/enter city/i);

    await userEvent.type(input, 'p');

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeVisible();

    expect(screen.getByText('Pretoria')).toBeInTheDocument();
    expect(screen.getByText('Port Elizabeth')).toBeInTheDocument();
    expect(screen.getByText('Polokwane')).toBeInTheDocument();

    expect(screen.queryByText('Durban')).not.toBeInTheDocument();
  });

  it('selects a suggestion and calls setLocation', async () => {
    render(<LocationSearch />);
    const input = screen.getByPlaceholderText(/enter city/i);

    await userEvent.type(input, 'c');
    await userEvent.click(screen.getByText('Cape Town'));

    expect(input).toHaveValue('Cape Town');
    expect(setLocationMock).toHaveBeenCalledWith('Cape Town');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('submits form with typed city and calls setLocation', async () => {
    render(<LocationSearch />);
    const input = screen.getByPlaceholderText(/enter city/i);

    await userEvent.type(input, 'Johannesburg');
    fireEvent.submit(input.closest('form')!);

    expect(setLocationMock).toHaveBeenCalledWith('Johannesburg');
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <>
        <LocationSearch />
        <button data-testid="outside">Outside</button>
      </>
    );

    const input = screen.getByPlaceholderText(/enter city/i);
    await userEvent.type(input, 'd');

    expect(screen.getByRole('list')).toBeVisible();

    await userEvent.click(screen.getByTestId('outside'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
