import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import QueryForm from '.';

it('renders form', () => {
	render(<QueryForm />);
	expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
});
