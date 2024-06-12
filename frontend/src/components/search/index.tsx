import React, { useState, useMemo } from 'react';
import { StyledSearchBar, StyledAvatar, StyledDropdown, List, ListItem, ListItemText, StyledBox } from './style'
import { ListItemAvatar, IconButton, Alert } from '@mui/material';
import { StyledAddButton } from '../common/styles'
import { useReadingList } from '../../context/reading-list-context';

const SearchBar = (data: any) => {
    const [searchTerm, setSearchTerm] = useState<String | null>(null);
    const handleChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return [];
        }
        return data.data.filter((item: { title: string; }) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const { addToReadingList } = useReadingList();

    return (
        <StyledBox>
            <StyledSearchBar
                variant="outlined"
                placeholder="Book"
                value={searchTerm || ''}
                onChange={handleChange}
            />

            {searchTerm && <StyledDropdown>
                {filteredData.length > 0 ? (<List>
                    {filteredData.map((item: any, index: any) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <StyledAvatar src={item.coverPhotoURL} />
                            </ListItemAvatar>
                            <ListItemText primary={item.title} secondary={`By: ${item.author}`} />
                            <IconButton onClick={() => addToReadingList(item)} aria-label="add">
                                <StyledAddButton color='secondary' />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                ) : <Alert severity="error">Book Not Found</Alert>
                }
            </StyledDropdown>
            }
        </StyledBox>
    );
}

export default SearchBar;
