import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useReadingList } from '../../context/reading-list-context';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BookCard = ({ book }: any) => {
  const { title, author, coverPhotoURL } = book;
  const { addToReadingList, readingList } = useReadingList();

  const bookIsInYourReadingList = readingList?.filter((book) => {
    return book.title === title;
  })

  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia component="img" height="140" image={coverPhotoURL} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="secondary" >
          Author: {author}
        </Typography>
      </CardContent>
      <CardActions>
        {bookIsInYourReadingList && bookIsInYourReadingList.length > 0 ?
          <FavoriteIcon color='error' /> : <FavoriteBorderIcon onClick={() => addToReadingList(book)} data-testid='add-to-reading-list' />
        }
      </CardActions>
    </Card>
  );
};

export default BookCard;
