import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { useReadingList } from '../../context/reading-list-context';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IBook } from '../types/types';

interface BookCardProps {
  book: IBook;
}

const BookCard:React.FC<BookCardProps> = ({ book }) => {
  
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
          <FavoriteIcon color='error' sx={{cursor:'pointer'}}/> : <FavoriteBorderIcon color='secondary' onClick={() => addToReadingList(book)} data-testid='add-to-reading-list'  sx={{cursor:'pointer'}}/>
        }
      </CardActions>
    </Card>
  );
};

export default BookCard;
