import React, { useState } from 'react';
import '../Styles/gamify.css';
import { Grid, Box, Stack } from '@mui/material';
import PageLayout from '../Layout/PageLayout';

const tilesArray = [
  {
    top: {
      visible: false,
      transitioned: false
    },
    right: {
      visible: true,
      transitioned: false
    },
    bottom: {
      visible: false,
      transitioned: false
    },
    left: {
      visible: false,
      transitioned: false
    }
  },
  {
    top: {
      visible: false,
      transitioned: false
    },
    right: {
      visible: true,
      transitioned: false
    },
    bottom: {
      visible: false,
      transitioned: false
    },
    left: {
      visible: true,
      transitioned: false
    }
  },
  {
    top: {
      visible: false,
      transitioned: false
    },
    right: {
      visible: false,
      transitioned: false
    },
    bottom: {
      visible: true,
      transitioned: false
    },
    left: {
      visible: true,
      transitioned: false
    }
  }
];

const Gamify = () => {

  const [tiles, setTiles] = useState(tilesArray);

  const onTaskClick = (e) => {
    const tempTiles = tiles;
    tempTiles[0].right.transitioned = true;
    tempTiles[1].left.transitioned = true;
    setTiles(tempTiles);
    console.log(tempTiles);
  }

  const Row = () => {
    return (
      <Grid container sx={{ height: '20em' }}>
        <Grid item xs={4}>
          <Tile topLine={tiles[0].top.visible || false} rightLine={tiles[0].right.visible || false} bottomLine={tiles[0].bottom.visible || false} leftLine={tiles[0].left.visible || false} rightLineTransitioned={tiles[0].right.transitioned}></Tile>
        </Grid>
        <Grid item xs={4}>
          <Tile topLine={tiles[1].top.visible || false} rightLine={tiles[1].right.visible || false} bottomLine={tiles[1].bottom.visible || false} leftLine={tiles[1].left.visible || false} leftLineTransitioned={tiles[1].left.transitioned}></Tile>
        </Grid>
        <Grid item xs={4}>
          <Tile topLine={tiles[2].top.visible || false} rightLine={tiles[2].right.visible || false} bottomLine={tiles[2].bottom.visible || false} leftLine={tiles[2].left.visible || false}></Tile>
        </Grid>
      </Grid>
    );
  }
  
  const Tile = ({ topLine, rightLine, bottomLine, leftLine, topLineTransitioned, rightLineTransitioned, bottomLineTransitioned, leftLineTransitioned }) => {
    return (
      <Grid container sx={{ width: '100%', height: '100%' }} onClick={onTaskClick}>
        <Grid item xs={3} sx={{ background: '#c7d5e8', display: 'flex', alignItems: 'center' }}>
          {/*Left*/}
          {leftLine && (<Box className="horizontalLine" sx={{ background: leftLineTransitioned ? '#45ba9c' : '#632fd0' }}></Box>)}
        </Grid>
        <Grid item xs={6}>
          <Stack sx={{ height: '100%', width: '100%' }}>
            <Box sx={{ height: '22.5%', background: '#c7d5e8', display: 'flex', justifyContent: 'center' }}>
              {/*Top*/}
              {topLine && (<Box className="verticalLine" sx={{ background: topLineTransitioned ? '#45ba9c' : '#632fd0' }}></Box>)}
            </Box>
            <Box sx={{ height: '55%', background: '#c7d5e8' }}>
              {/*Center*/}
              <Box className="taskCircle" sx={{ width: '100%', height: '100%', background: '#b85647'}}></Box>
            </Box>
            <Box sx={{ height: '22.5%', background: '#c7d5e8', display: 'flex', justifyContent: 'center' }}>
              {/*Bottom*/}
              {bottomLine && (<Box className="verticalLine" sx={{ background: bottomLineTransitioned ? '#45ba9c' : '#632fd0' }}></Box>)}
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={3} sx={{ background: '#c7d5e8', display: 'flex', alignItems: 'center' }}>
          {/*Right*/}
          {rightLine && (<Box className="horizontalLine" sx={{ background: rightLineTransitioned ? '#45ba9c' : '#632fd0' }}></Box>)}
        </Grid>
      </Grid>
    );
  }

  return (
    <PageLayout>
      <Box sx={{ marginTop: '15px', marginBottom: '15px', width: '100%', height: '100%' }}>
        <Row ></Row>
      </Box>
    </PageLayout>
  );
};

export default Gamify;
