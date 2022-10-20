import { Container } from '@mui/system'
import React from 'react'

const WidthLayout = (props) => {
    return (
        <Container sx={{ maxWidth: "1096px", width: "1096px", }}>{props.children}</Container>
    )
}

export default WidthLayout