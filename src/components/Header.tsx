import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode, GitHub } from '@mui/icons-material';
import { useTaskStore } from '../store/Store';
import SearchBar from './SearchBar'; // استدعاء الكومبوننت الجديد
// import { useMemo, useState } from 'react';


const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTaskStore();
    const { searchQuery, setSearchQuery } = useTaskStore();



    // const filteredTasks = useMemo(({ }) => {
    //     return tasks.filter(task =>
    //         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // }, [tasks, searchQuery]);



    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'var(--bg)',
                borderBottom: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                color: 'var(--text-h)',
                height: '70px',
                marginBottom: '20px',
                justifyContent: 'center' // لضمان توسيط العناصر رأسياً
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontWeight: 'bold',
                        display: { xs: 'none', sm: 'block' },
                        color: 'var(--accent)'
                    }}
                >
                    Mindluster Kanban
                </Typography>


                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        onClick={toggleDarkMode}
                        color="inherit"
                        sx={{ border: '1px solid var(--border)', borderRadius: '8px' }}
                    >
                        {isDarkMode ?
                            <LightMode sx={{ color: '#ffb400' }} /> :
                            <DarkMode sx={{ color: 'var(--text)' }} />
                        }
                    </IconButton>

                    <IconButton
                        color="inherit"
                        href="https://github.com/Hanafi6"
                        target="_blank"
                        sx={{ border: '1px solid var(--border)', borderRadius: '8px' }}
                    >
                        <GitHub />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;