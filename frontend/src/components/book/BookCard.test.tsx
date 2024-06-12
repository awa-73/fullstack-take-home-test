import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookCard from '.';
import { useReadingList } from '../../context/reading-list-context';

jest.mock('../../context/reading-list-context', () => ({
    useReadingList: jest.fn(),
}));

describe('BookCard Component', () => {
    const mockBook = {
        title: 'Test Book',
        author: 'Test Author',
        coverPhotoURL: 'test-cover.jpg',
    };

    const mockAddToReadingList = jest.fn();

    beforeEach(() => {
        (useReadingList as jest.Mock).mockReturnValue({
            addToReadingList: mockAddToReadingList,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders book details correctly', () => {
        render(<BookCard book={mockBook} />);

        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Author: Test Author')).toBeInTheDocument();
        expect(screen.getByAltText('Test Book')).toHaveAttribute('src', 'test-cover.jpg');
    });

    it('calls addToReadingList when the button is clicked', () => {
        render(<BookCard book={mockBook} />);

        const button = screen.getByTestId('add-to-reading-list');
        fireEvent.click(button);

        expect(mockAddToReadingList).toHaveBeenCalledWith(mockBook);
    });
});
