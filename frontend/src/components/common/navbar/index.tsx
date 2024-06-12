import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledLink, StyledButton} from './styles'

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <StyledLink to="/">
                    Ello
                </StyledLink>
                <Link to="/reading-list">
                    <StyledButton color="secondary" variant='contained' >
                        Reading List
                    </StyledButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
