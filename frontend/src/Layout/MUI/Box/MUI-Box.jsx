import { Box } from '@mui/material'
import React from 'react'

export const MUIBox = ({ children }) => {
    return (
        <Box sx={{
            width: 300,
            height: 300,
            bgcolor: 'primary.main',
            '&:hover': {
                backgroundColor: 'primary.dark',
                opacity: [0.9, 0.8, 0.7],
            },
        }} >{children}</Box>
    )

}
