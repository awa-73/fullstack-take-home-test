import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReadingListView from '.'; 
import { useReadingList } from '../../context/reading-list-context';

jest.mock('../../context/reading-list-context', () => ({
    useReadingList: jest.fn(),
}));

describe('ReadingListView Component', () => {
    const mockReadingList = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Book ${i + 1}`,
        author: `Author ${i + 1}`,
        coverPhotoURL: `cover-${i + 1}.jpg`,
    }));

    const mockRemoveFromReadingList = jest.fn();

    beforeEach(() => {
        (useReadingList as jest.Mock).mockReturnValue({
            readingList: mockReadingList,
            removeFromReadingList: mockRemoveFromReadingList,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders reading list items correctly', () => {
        render(<ReadingListView />);

        expect(screen.getByText('Your Reading List')).toBeInTheDocument();
        mockReadingList.slice(0, 12).forEach((book) => {
            expect(screen.getByText(book.title)).toBeInTheDocument();
            expect(screen.getByText(`Author: ${book.author}`)).toBeInTheDocument();
        });
    });

    it('paginates reading list items correctly', async () => {
        render(<ReadingListView />);

        fireEvent.click(screen.getByText('Next Page'));

        await waitFor(() => {
            expect(screen.getByText('Book 13')).toBeInTheDocument();
            expect(screen.getByText('Book 20')).toBeInTheDocument();
            expect(screen.queryByText('Book 1')).not.toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Previous Page'));

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('Book 12')).toBeInTheDocument();
            expect(screen.queryByText('Book 13')).not.toBeInTheDocument();
        });
    });

    it('removes items from reading list correctly', () => {
        render(<ReadingListView />);

        const firstRemoveButton = screen.getAllByTestId('remove-from-list')[0];
        fireEvent.click(firstRemoveButton);

        expect(mockRemoveFromReadingList).toHaveBeenCalledWith(mockReadingList[0]);
    });

    it('displays empty reading list alert correctly', () => {
        (useReadingList as jest.Mock).mockReturnValue({
            readingList: [],
            removeFromReadingList: mockRemoveFromReadingList,
        });

        render(<ReadingListView />);

        expect(screen.getByText('You have not added any book to your reading list.')).toBeInTheDocument();
    });
});
