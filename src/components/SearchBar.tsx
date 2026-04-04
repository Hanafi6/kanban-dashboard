import React from "react";
import { InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: 'var(--social-bg)',
    border: '1px solid var(--border)',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'var(--text)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
            '&:focus': { width: '35ch' }
        },
    },
}));

const SearchBar = ({ searchQuery, setSearchQuery }: {
    searchQuery: string,
    setSearchQuery: (val: string) => void
}) => {

    return (
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
        </SearchContainer>
    );
};

export default SearchBar;