import React from 'react';
import { render, fireEvent, waitFor } from '../../utils/test-utils';
import BooksView from '.';

const mockData = Array.from({ length: 50 }, (_, index) => ({
    coverPhotoURL: `assets/image${index}.webp`,
    title: `Book ${index + 1}`,
    author: `Author ${index + 1}`,
}));


describe('Results Component', () => {
    it('renders book cards and pagination buttons correctly', async () => {
        const { getByText, getAllByText } = render(<BooksView data={mockData} />);

        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Author: Author 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Author: Author 2')).toBeInTheDocument();

        expect(getAllByText('Previous Page')).toHaveLength(1);
        expect(getAllByText('Next Page')).toHaveLength(1);
    });

    it('allows navigating through pages', async () => {
        const { getByText, queryByText } = render(<BooksView data={mockData} />);
        fireEvent.click(getByText('Next Page'));
        await waitFor(() => {
            expect(queryByText('Book 1')).not.toBeInTheDocument();
            expect(queryByText('Book 2')).not.toBeInTheDocument();
        });

        fireEvent.click(getByText('Previous Page'));
        await waitFor(() => {
            expect(getByText('Book 1')).toBeInTheDocument();
            expect(getByText('Book 2')).toBeInTheDocument();
        });
    });

    it('disables previous and next page buttons correctly', async () => {
        const { getByText } = render(<BooksView data={mockData} />);

        expect(getByText('Previous Page')).toBeDisabled();

        fireEvent.click(getByText('Next Page'));
        await waitFor(() => {
            expect(getByText('Previous Page')).not.toBeDisabled();
        });

        fireEvent.click(getByText('Next Page'));
        fireEvent.click(getByText('Next Page'));
        expect(getByText('Next Page')).toBeDisabled();
    });
});
