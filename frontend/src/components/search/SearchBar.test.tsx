import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '.';
import { useReadingList } from '../../context/reading-list-context';

jest.mock('../../context/reading-list-context', () => ({
    useReadingList: jest.fn(),
}));

describe('SearchBar Component', () => {
    const mockData = [
        { id: 1, title: 'Book 1', author: 'Author 1', coverPhotoURL: 'cover1.jpg' },
        { id: 2, title: 'Book 2', author: 'Author 2', coverPhotoURL: 'cover2.jpg' },
    ];

    const mockAddToReadingList = jest.fn();

    beforeEach(() => {
        (useReadingList as jest.Mock).mockReturnValue({
            addToReadingList: mockAddToReadingList,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders search bar correctly', () => {
        render(<SearchBar data={mockData}  />);

        expect(screen.getByPlaceholderText('Book')).toBeInTheDocument();
    });

    it('renders dropdown correctly with filtered data', () => {
        render(<SearchBar data={mockData} />);

        const input = screen.getByPlaceholderText('Book');
        fireEvent.change(input, { target: { value: 'Book 1' } });

        expect(screen.getByText('Book 1')).toBeInTheDocument();
        expect(screen.queryByText('Book 2')).not.toBeInTheDocument();
    });

    it('calls addToReadingList when add button is clicked', () => {
        render(<SearchBar data={mockData}  />);

        const input = screen.getByPlaceholderText('Book');
        fireEvent.change(input, { target: { value: 'Book 1' } });

        const addButton = screen.getByLabelText('add');
        fireEvent.click(addButton);

        expect(mockAddToReadingList).toHaveBeenCalledWith(mockData[0]);
    });

    it('renders "Book Not Found" when no matching books are found', () => {
        render(<SearchBar data={mockData}  />);

        const input = screen.getByPlaceholderText('Book');
        fireEvent.change(input, { target: { value: 'Unknown Book' } });

        expect(screen.getByText('Book Not Found')).toBeInTheDocument();
    });
});
