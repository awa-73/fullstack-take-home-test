import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

const StyledLink = styled(RouterLink)`
  flex-grow: 1;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  color:#ffffff;
`;

const StyledButton = styled(Button)`
  margin-left: 4rem;
  font-size: 0.6rem;
  font-weight:bold;
`;

export { StyledLink, StyledButton };
