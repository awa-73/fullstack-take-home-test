import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import { useReadingList } from '../../context/reading-list-context';

const BookCard = ({book}: any) => {
  const { title, author, coverPhotoURL } = book;
  const { addToReadingList } = useReadingList();
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={coverPhotoURL}
        alt={title}

      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="secondary" >
          Author: {author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => addToReadingList(book)} data-testid='add-to-reading-list' variant='contained' color='primary' aria-label="add" sx={{ fontSize: '0.7rem' }}>
          Add To Reading List
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
