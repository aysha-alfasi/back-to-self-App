import { render, screen, fireEvent } from '@testing-library/react';
import CoverPage from './CoverPage';

jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});

test('renders CoverPage and handles click', () => {
  const mockDiveIn = jest.fn();

  render(<CoverPage onDiveIn={mockDiveIn} />);

  expect(screen.getByText(/back/i)).toBeInTheDocument();
  expect(screen.getByText(/to self/i)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /dive in/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(mockDiveIn).toHaveBeenCalled();
});
