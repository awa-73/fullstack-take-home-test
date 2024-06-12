import React, { useState } from 'react';
import { useReadingList } from '../../context/reading-list-context';
import { Grid, Container, Typography, Alert, Button } from '@mui/material';
import { Card, CardContent, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';

const ReadingListView = () => {
    const { readingList, removeFromReadingList } = useReadingList();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(readingList.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <Container>
            <Typography variant='h4' color='primary' sx={{ padding: '2rem 0' }}> Your Reading List</Typography>
            {readingList.length ? (
                <>
                    <Grid container spacing={4} justifyContent="flex-start">
                        {readingList.slice(startIndex, endIndex).map((item: any, index: number) => {
                            const { title, author, coverPhotoURL } = item;
                            return (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="flex-start">
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia component="img" height="140" image={coverPhotoURL} alt={title} />
                                        <CardContent>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {title}
                                            </Typography>
                                            <Typography variant="body2" color="secondary">
                                                Author: {author}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                onClick={() => removeFromReadingList(item)}
                                                variant='contained'
                                                data-testid='remove-from-list'
                                                color='primary'
                                                aria-label="remove"
                                                sx={{ fontSize: '0.7rem' }}
                                            >
                                                Remove from list
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <div>
                        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</Button>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</Button>
                    </div>
                </>
            ) : (
                <Alert severity="error">You have not added any book to your reading list.</Alert>
            )}
        </Container>
    )
}

export default ReadingListView;
