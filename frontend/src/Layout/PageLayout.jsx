import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const PageLayout = (props) => {
    return (
        <Container sx={{ maxWidth: "1096px", width: "1096px", minHeight: "87vh", paddingLeft: "2rem", paddingRight: "2rem", display: "flex", justifyContent: "center" }}>
            {props.children}
        </Container>
    )
}

export default PageLayout