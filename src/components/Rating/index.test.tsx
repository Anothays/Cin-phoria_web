// import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import Rating from './';

describe('Rating Component', () => {
  it('should render the correct number of stars based on the rate', () => {
    const rate = 3;
    render(<Rating withTotal={false} rate={rate} />);
    const fullStars = screen.getByTestId('starsContainer');
    expect(fullStars.children.length).toBe(rate);
  });
});
