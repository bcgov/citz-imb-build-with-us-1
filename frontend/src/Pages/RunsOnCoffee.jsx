import React from 'react';
import { useNavigate } from 'react-router';
import PageLayout from '../Layout/PageLayout';
import { AppBar, Toolbar, Box, Typography, Button, Stack, IconButton, Menu, MenuItem } from '@mui/material';

const RunsOnCoffee = () => {
    const navigate = useNavigate();

    return <PageLayout>
        <Button
            color="inherit"
            sx={{ textTransform: 'none' }}
            onClick={() => navigate('/MemoryGame')}
        >
            Runs On Coffee
        </Button>
    </PageLayout>
}

export default RunsOnCoffee;
