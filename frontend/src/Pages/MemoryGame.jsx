import { Grid } from '@mui/material'
import styled from '@mui/system/styled'
import React from 'react'
import Data from '../mockdata/memorygame.json'

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));


export const MemoryGame = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={3}>
                {
                    Data.map(item => {
                        return <Item key={item.id}>{item.name}</Item>
                    })
                }
            </Grid>
        </Grid>
    )
}
