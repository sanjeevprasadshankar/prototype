import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('operations dashboard', () => {
  test('filters alerts by severity and acknowledges them', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: /operations dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/transformer temp spike/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sanjeevprasad.shankar@gmail.com' }))
      .toHaveAttribute('href', 'mailto:sanjeevprasad.shankar@gmail.com');
    expect(screen.getByText('Reliable energy. Smarter operations.')).toBeInTheDocument();
    expect(screen.getByText('Nationality: Indian')).toBeInTheDocument();
    expect(screen.getByText('State: Tamil Nadu')).toBeInTheDocument();
    expect(screen.getByText('Created by SIXINSYNC')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /critical/i }));
    expect(screen.getByText(/transformer temp spike/i)).toBeInTheDocument();
    expect(screen.queryByText(/water pressure variance/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /acknowledge/i }));
    expect(screen.getByRole('button', { name: /acknowledged/i })).toBeInTheDocument();
    expect(screen.getByText(/1 acknowledged/i)).toBeInTheDocument();
  });
});
