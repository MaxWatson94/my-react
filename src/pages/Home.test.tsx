import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders title', () => {
    render(<Home />);
    expect(screen.getByText(/Hello Vite \+ React \+ TS \+ Tailwind/i)).toBeInTheDocument();
  });
});
