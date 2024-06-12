import React, { useState } from 'react';
import BookCard from '../book';
import { Grid, Container, Button, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const BooksView = (data: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const totalPages = Math.ceil(data.data.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <Container sx={{ padding: '20px 10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl variant="outlined" size="small" sx={{ width: '200px' }} data-testid="items-per-page-label">
                    <InputLabel id="items-per-page-label">Items per page</InputLabel>
                    <Select
                        labelId="items-per-page-label"
                        value={itemsPerPage}
                        data-testid='items-per-page'
                        label="Items per page"
                        onChange={handleItemsPerPageChange}
                        sx={{ width: '200px' }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={4} justifyContent="center" data-testid="books-grid">
                {data.data.slice(startIndex, endIndex).map((item: any, index: number) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        display="flex"
                        justifyContent="center"
                    >
                        <BookCard book={item} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ padding: '10px 0' }}>
                <Button onClick={handlePrevPage} disabled={currentPage === 1} data-testid="prev-page-button">
                    Previous Page
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} data-testid="next-page-button">
                    Next Page
                </Button>
            </Box>
        </Container>
    );
};

export default BooksView;
