import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RankingTable, RankingPosition } from '../ranking-table';

const mockRanking: RankingPosition[] = [
    {
        name: 'John',
        maxScore: 100,
        allScores: [100, 90, 80],
        isExpanded: false,
    },
    {
        name: 'Doe',
        maxScore: 95,
        allScores: [95, 85],
        isExpanded: false,
    },
];

describe('RankingTable', () => {
    it('renders table headers', () => {
        render(<RankingTable ranking={mockRanking} />);
        expect(screen.getByText(/Player/i)).toBeInTheDocument();
        expect(screen.getByText(/Max score/i)).toBeInTheDocument();
    });

    it('renders player rows', () => {
        render(<RankingTable ranking={mockRanking} />);
        mockRanking.forEach(player => {
            expect(screen.getByText(player.name)).toBeInTheDocument();
            expect(screen.getByText(player.maxScore.toString())).toBeInTheDocument();
        });
    });

    it('expands and collapses rows on click', () => {
        render(<RankingTable ranking={mockRanking} />);

        fireEvent.click(screen.getByText('John'));

        mockRanking[0].allScores.forEach(score => {
            expect(screen.getAllByText(score.toString()).length).toBeGreaterThanOrEqual(1);
        });

        fireEvent.click(screen.getByText('John'));

        expect(screen.queryByText(mockRanking[0].allScores[0].toString())).toBeVisible();
        expect(screen.queryByText(mockRanking[0].allScores[1].toString())).toBeNull();
    });
});
