import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/CoverPage', () => ({ onDiveIn }) => (
  <div>
    <p>Cover Page</p>
    <button onClick={onDiveIn}>Dive In</button>
  </div>
));

jest.mock('./components/OptionsPage', () => ({ setPage }) => (
  <div>
    <p>Options Page</p>
  </div>
));

test('navigates from CoverPage to OptionsPage on click', () => {
  render(<App />);

  expect(screen.getByText(/cover page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/dive in/i));

  expect(screen.getByText(/options page/i)).toBeInTheDocument();
});
