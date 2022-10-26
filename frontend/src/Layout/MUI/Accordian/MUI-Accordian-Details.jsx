import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import React from 'react';

export const MUIAccordianDetail = ({ children }) => {
    console.log('Children', children)
    return (

        <AccordionDetails  sx={{ width: '100%s' }}>
            <Typography>
                {children}
            </Typography>
        </AccordionDetails>

    );
}
