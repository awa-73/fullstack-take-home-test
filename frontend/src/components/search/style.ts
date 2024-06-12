import { styled } from '@mui/material/styles';
import { TextField, Paper, List, ListItem, ListItemText, Avatar, Box } from '@mui/material';

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5),
  },
}));

const StyledDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  width: '400px',
  maxHeight: '400px',
  overflowY: 'auto',
  zIndex: 1,
  marginTop: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)({
  borderRadius: '0',
  width: '50px',
  height: '50px',
});
const StyledBox = styled(Box)({
  maxWidth: '380px',
  margin: 'auto',
  padding: '20px 10px'
});



export { StyledSearchBar, StyledDropdown, StyledAvatar, List, ListItem, ListItemText, StyledBox };
