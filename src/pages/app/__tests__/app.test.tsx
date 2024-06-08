import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app';

jest.mock('@chakra-ui/react', () => {
    const originalModule = jest.requireActual('@chakra-ui/react');
    return {
        ...originalModule,
        useToast: () => jest.fn(),
    };
});

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByText(/Mediatool exercise/i)).toBeInTheDocument();
    });

    it('handles new player score submission', async () => {
        render(<App />);

        const playerInput = screen.getByLabelText(/Player/i);
        const scoreInput = screen.getByLabelText(/Score/i);
        const submitButton = screen.getByText(/Submit/i);

        fireEvent.change(playerInput, { target: { value: 'NewPlayer' } });
        fireEvent.change(scoreInput, { target: { value: '200' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('NewPlayer')).toBeInTheDocument();
            expect(screen.getByText('200')).toBeInTheDocument();
        });
    });

});
