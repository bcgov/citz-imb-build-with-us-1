import React from 'react';
import '../Styles/gamify.css';
import { Grid, Box, Stack } from '@mui/material';
import PageLayout from '../Layout/PageLayout';

const Row = ({props}) => {
  return (
    <Grid container sx={{ height: '20em' }}>
      <Grid item xs={4}>
        <Tile topLine={props.tile1.top || false} rightLine={props.tile1.right || false} bottomLine={props.tile1.bottom || false} leftLine={props.tile1.left || false}></Tile>
      </Grid>
      <Grid item xs={4}>
        <Tile topLine={props.tile2.top || false} rightLine={props.tile2.right || false} bottomLine={props.tile2.bottom || false} leftLine={props.tile2.left || false}></Tile>
      </Grid>
      <Grid item xs={4}>
        <Tile topLine={props.tile3.top || false} rightLine={props.tile3.right || false} bottomLine={props.tile3.bottom || false} leftLine={props.tile3.left || false}></Tile>
      </Grid>
    </Grid>
  );
}

const Tile = ({ topLine, rightLine, bottomLine, leftLine }) => {
  return (
    <Grid container sx={{ width: '100%', height: '100%' }}>
      <Grid item xs={3} sx={{ background: '#c7d5e8', display: 'flex', alignItems: 'center' }}>
        {/*Left*/}
        {leftLine && (<Box className="horizontalLine"></Box>)}
      </Grid>
      <Grid item xs={6}>
        <Stack sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ height: '22.5%', background: '#c7d5e8', display: 'flex', justifyContent: 'center' }}>
            {/*Top*/}
            {topLine && (<Box className="verticalLine"></Box>)}
          </Box>
          <Box sx={{ height: '55%', background: '#c7d5e8' }}>
            {/*Center*/}
            <Box className="taskCircle" sx={{ width: '100%', height: '100%', background: '#b85647'}}></Box>
          </Box>
          <Box sx={{ height: '22.5%', background: '#c7d5e8', display: 'flex', justifyContent: 'center' }}>
            {/*Bottom*/}
            {bottomLine && (<Box className="verticalLine"></Box>)}
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={3} sx={{ background: '#c7d5e8', display: 'flex', alignItems: 'center' }}>
        {/*Right*/}
        {rightLine && (<Box className="horizontalLine"></Box>)}
      </Grid>
    </Grid>
  );
}

const Gamify = () => {
  return (
    <PageLayout>
      <Box sx={{ marginTop: '15px', marginBottom: '15px', width: '100%', height: '100%' }}>
        <Row 
        props={{
          tile1: { top: false, right: true, bottom: false, left: false },
          tile2: { top: false, right: true, bottom: false, left: true },
          tile3: { top: false, right: false, bottom: true, left: true }
        }}></Row>

        <Row 
        props={{
          tile1: { top: false, right: true, bottom: true, left: false },
          tile2: { top: false, right: true, bottom: false, left: true },
          tile3: { top: true, right: false, bottom: false, left: true }
        }}></Row>
      </Box>
    </PageLayout>
  );
};

export default Gamify;
