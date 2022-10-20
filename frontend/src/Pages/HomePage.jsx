import { Box, Grid } from '@mui/material'
import { Stack } from "@mui/system"
import React from 'react'
import PageLayout from '../Layout/PageLayout'

import Typography from '@mui/material/Typography';
const HomePage = () => {
    return (
        <PageLayout>
            <Grid container alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
                <Grid item xs={6}>
                    <Stack>
                        <Typography variant="h3" fontWeight="bold">
                            Welcome to
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h3" fontWeight="bold" sx={{ color: "#9b9a9a" }}>
                                CITZ IMB
                            </Typography>
                            <img src="/heart.png" style={{ maxHeight: "40px" }} />
                        </Stack>

                    </Stack>

                </Grid>
                <Grid item xs={6}>
                    <img src="/diversity.jpg" style={{ maxWidth: "100%", borderRadius: "25px" }} />
                </Grid>
            </Grid>
        </PageLayout>
    )
}

export default HomePage