import { Container, IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import WidthLayout from './WidthLayout';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const footerSX = { backgroundColor: "footer.main", color: "#fff", height: "6.5vh", display: "flex", alignItems: "center" }

const Footer = () => {

    return (
        <Box sx={footerSX}>
            <WidthLayout>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" fontWeight={200}>
                        Ministry of Citizens' Services, OCIO-ES, IMB
                    </Typography>
                    <a href="https://github.com/bcgov/citz-imb-build-with-us-1" style={{ color: "inherit" }}>
                        <GitHubIcon />
                    </a>
                </Stack>
            </WidthLayout>



        </Box>
    )
}

export default Footer