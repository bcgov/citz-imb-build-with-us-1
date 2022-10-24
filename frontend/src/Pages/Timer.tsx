import '../Styles/timer.css';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ArrowDropUp as ArrowDropUpIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import PageLayout from '../Layout/PageLayout';
import timerAgenda from '../Utils/timerAgenda';
import moment from 'moment';

const Timer = () => {
  let timerStarted = false;
  const [previousTask, setPreviousTask] = useState(['--', '??', '??']);
  const [currentTask, setCurrentTask] = useState(['--', '??', '??']);
  const [nextTask, setNextTask] = useState(['--', '??', '??']);
  const [timeLeft, setTimeLeft] = useState('00:00');

  // Total minute duration of the agenda
  const agendaDurationMinutes = timerAgenda.agenda.reduce((accumulator, object) => {
    return accumulator + object.durationMinutes;
  }, 0);

  // Get exact agenda start and end times
  const splitStartTime = timerAgenda.start.split(' ');
  const agendaStartTimeString = `${splitStartTime[0]}:00 ${splitStartTime[1]}`;
  const agendaStartAsDateString = `${agendaStartTimeString}, ${moment().format('Do MMMM YYYY')}`;
  const agendaStartAsDate = moment(agendaStartAsDateString, 'h:mm:ssa, Do MMMM YYYY').toDate();

  // Create moment objects to compare times
  const formatTime = 'h:mm:ss a';
  const agendaStartTimeAsMoment = moment(agendaStartAsDate, formatTime);
  const agendaEndTimeAsMoment = moment(moment(agendaStartAsDate).add(agendaDurationMinutes, 'minutes'), formatTime);

  // Current time displayed at top of page
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('h:mm a, Do MMMM'));
  useEffect(() => {
    setInterval(() => {
      setCurrentDateTime(moment().format('h:mm a, Do MMMM'));
      if (moment().isBetween(agendaStartTimeAsMoment, agendaEndTimeAsMoment) && !timerStarted) {
        timerStarted = true;
        const minutesSinceStart = moment().diff(agendaStartTimeAsMoment, 'minutes', true);
        startAgenda(minutesSinceStart);
      }
    }, 1000);
  }, []);

  // Controls timer state
  const timer = async (minutes: number, seconds?: number) => {
    const waitSecond = () => new Promise(res => setTimeout(res, 1000));
    for (let secondsInTimer = 0; secondsInTimer < ((minutes * 60) + (seconds || 0)); secondsInTimer++) {
      let minutesLeft = Math.floor((((minutes * 60) + (seconds || 0)) - secondsInTimer) / 60);
      if (minutesLeft < 0) minutesLeft = 0;
      const secondsLeft = (((minutes * 60) + (seconds || 0)) - secondsInTimer) % 60;
      let hoursLeft = 0;
      let minutesLeftString = minutesLeft > 9 ? `${minutesLeft}` : `0${minutesLeft}`;
      if (minutesLeft > 60) {
        hoursLeft = Math.floor(minutesLeft / 60);
        minutesLeft = minutesLeft - (60 * hoursLeft);
        minutesLeftString = minutesLeft > 9 ? `${hoursLeft}:${minutesLeft}` : `${hoursLeft}:0${minutesLeft}`;
      }
      const secondsLeftString = secondsLeft > 9 ? `${secondsLeft}` : `0${secondsLeft}`;
      setTimeLeft(`${minutesLeftString}:${secondsLeftString}`);
      await waitSecond();
    };
  };

  // Controls timer and agenda state
  const startAgenda = async (minutesSinceStart: number) => {
    const waitDuration = (minutes: number, seconds?: number) => new Promise(res => 
      setTimeout(res, ((minutes * 60) + (seconds || 0)) * 1000));

    // Find what task to start on and how far into the task to start
    let minutesLeftInTask = Math.floor(minutesSinceStart);
    let secondsLeftInTask = 60 - Math.floor((minutesSinceStart - minutesLeftInTask) * 60);
    if (secondsLeftInTask > 0) minutesLeftInTask += 1;
    let startingTask = 0;
    for (let task = 0; task < timerAgenda.agenda.length; task++) {
      if (minutesLeftInTask > timerAgenda.agenda[task].durationMinutes) {
        minutesLeftInTask -= timerAgenda.agenda[task].durationMinutes;
      } else {
        minutesLeftInTask = timerAgenda.agenda[task].durationMinutes - minutesLeftInTask;
        startingTask = task;
        break;
      }
    }

    let prev = previousTask;

    // Run through tasks
    for (let task = startingTask; task < timerAgenda.agenda.length; task++) {
      let curr;
      let next;

      // Set prev when starting after the first task
      if (task === startingTask && startingTask > 0) {
        let minutesPastInCurrentTask = timerAgenda.agenda[task].durationMinutes - minutesLeftInTask;
        if (secondsLeftInTask > 0) minutesPastInCurrentTask -= 1;
        const minutesSinceStartOfPrevTask = minutesPastInCurrentTask + timerAgenda.agenda[task - 1].durationMinutes;
        const previousTaskStart = moment().subtract(minutesSinceStartOfPrevTask , 'minutes').format('h:mma');
        const previousTaskEnd = moment().subtract(minutesPastInCurrentTask , 'minutes').format('h:mma');
        prev = [timerAgenda.agenda[task - 1].title, previousTaskStart, previousTaskEnd];
      }

      // Current
      if (task > 0) {
        const currentTaskStartAsDateString = `${prev[2]}, ${moment().format('Do MMMM YYYY')}`;
        const currentTaskStartAsDate = moment(currentTaskStartAsDateString, 'h:mma, Do MMMM YYYY').toDate();
        const currentTaskEnd = moment(currentTaskStartAsDate)
          .add(timerAgenda.agenda[task].durationMinutes, 'minutes').format('h:mma');
        curr = [timerAgenda.agenda[task].title, prev[2], currentTaskEnd];
      } else {
        // Initialize the current task
        const firstTaskTitle = timerAgenda.agenda[0].title;
        const firstTaskStart = timerAgenda.start.replace(/\s+/, "");
        const firstTaskStartAsDateString = `${timerAgenda.start}, ${moment().format('Do MMMM YYYY')}`;
        const firstTaskStartAsDate = moment(firstTaskStartAsDateString, 'h:mm a, Do MMMM YYYY').toDate();
        const firstTaskEnd = moment(firstTaskStartAsDate).add(timerAgenda.agenda[0].durationMinutes, 'minutes').format('h:mma');
        curr = [firstTaskTitle, firstTaskStart, firstTaskEnd];
      }

      // Next
      if (task < timerAgenda.agenda.length - 1) {
        const nextTaskStartAsDateString = `${curr[2]}, ${moment().format('Do MMMM YYYY')}`;
        const nextTaskStartAsDate = moment(nextTaskStartAsDateString, 'h:mma, Do MMMM YYYY').toDate();
        const nextTaskEnd = moment(nextTaskStartAsDate)
          .add(timerAgenda.agenda[task + 1].durationMinutes, 'minutes').format('h:mma');
        next = [timerAgenda.agenda[task + 1].title, curr[2], nextTaskEnd];
      } else {
        next = ['--', '??', '??'];
      }

      setPreviousTask(prev);
      setCurrentTask(curr);
      setNextTask(next);
      prev = curr;

      // Start the timer
      if (task === startingTask) {
        timer(minutesLeftInTask, secondsLeftInTask);
        // Wait before moving on to the next task
        await waitDuration(minutesLeftInTask, secondsLeftInTask);
      } else {
        timer(timerAgenda.agenda[task].durationMinutes);
        // Wait before moving on to the next task
        await waitDuration(timerAgenda.agenda[task].durationMinutes);
      }
    };
  };

  return (
    <>
    <Box className='currentDateTimeBox'>
      {/* Current Date/Time */}
      <Typography className="typography" sx={{ margin: 'auto', fontSize: '2.5em', fontWeight: 700 }}>
        {currentDateTime}
      </Typography>
    </Box>
    <PageLayout>
      <Stack sx={{ height: '60vh', width: '100%' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={5} sx={{ height: '100%' }}>
            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
              {/* Timer Circle */}
              <Box className='timerCircles'>
                <Box className='timerCircleContent'>
                  <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography className='typography' sx={{ fontSize: '4em', fontWeight: 700 }}>
                      {timeLeft}
                    </Typography>
                    <Typography className='typography' sx={{ fontSize: '2.5em', fontWeight: 700 }}>
                      Left
                    </Typography>
                  </Stack>
                </Box>
                <Box className='timerCircleOuter'></Box>
                <Box className='timerCircleInner'></Box>
                <Box className='timerCircleAccent'></Box>
                <Box id='timerCircleProgressFirst'></Box>
                <Box id='timerCircleProgressSecond'></Box>
                <Box id='timerCircleProgressFiller'></Box>
              </Box>
              {/* <Box sx={{ width: '76%', height: '24%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <Button sx={{ 
                  background: '#eeeeee', 
                  color: '#212122', 
                  fontSize: '1em', 
                  fontFamily: 'Arial Black',
                  textTransform: 'none',
                  width: '5.5em',
                  }}>
                  Reset
                </Button>
              </Box> */}
            </Stack>
          </Grid>
          <Grid item xs={7} sx={{ height: '100%' }}>
            <Stack sx={{ height: '100%' }}>
              {/* Agenda */}
              <Box sx={{ textAlign: 'right' }}>
                <ArrowDropUpIcon className='arrowIcon' sx={{ fontSize: '3.5em' }} />
              </Box>
              <Box sx={{ height: '100%' }}>
                <Box sx={{ height: '33%' }}>
                  {/*Previous*/}
                  <Stack direction='row' spacing={1} className='agendaPreviousNextStack'>
                    <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                      Previous:
                    </Typography>
                    {previousTask[0] === '--'
                      ? (
                      <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                        None
                      </Typography>
                      )
                      : (
                      <>
                        <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                          {previousTask[0]}
                        </Typography>
                        <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                          ({previousTask[1]} - {previousTask[2]})
                        </Typography>
                      </>
                      )
                    }
                  </Stack>
                </Box>
                <Box className='agendaNowBorders' sx={{ height: '33%' }}>
                  {/*Now*/}
                  <Stack direction='row' spacing={1} className='agendaNowStack'>
                    <Typography className='typography' sx={{ fontSize: '1.75em', fontWeight: 700 }}>
                      Now:
                    </Typography>
                    {currentTask[0] === '--'
                      ? (
                      <Typography className='typography' sx={{ fontSize: '1.75em', fontWeight: 700 }}>
                        No agenda is running at the moment.
                      </Typography>
                      )
                      : (
                      <>
                        <Typography className='typography' sx={{ fontSize: '1.75em', fontWeight: 700 }}>
                          {currentTask[0]}
                        </Typography>
                        <Typography className='typography' sx={{ fontSize: '1.75em', fontWeight: 700 }}>
                          ({currentTask[1]} - {currentTask[2]})
                        </Typography>
                      </>
                      )
                    }
                  </Stack>
                </Box>
                <Box sx={{ height: '33%' }}>
                  {/*Next*/}
                  <Stack direction='row' spacing={1} className='agendaPreviousNextStack'>
                    <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                      Next:
                    </Typography>
                    {nextTask[0] === '--'
                      ? (
                      <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                        None
                      </Typography>
                      )
                      : (
                      <>
                        <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                          {nextTask[0]}
                        </Typography>
                        <Typography className='typography agendaPreviousNextText' sx={{ fontSize: '1.25em', fontWeight: 700 }}>
                          ({nextTask[1]} - {nextTask[2]})
                        </Typography>
                      </>
                      )
                    }
                  </Stack>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <ArrowDropDownIcon className='arrowIcon' sx={{ fontSize: '3.5em' }} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ height: '2.5vh', marginBottom: '20px' }}>
          {/* Timer Controls */}
        </Box>
      </Stack>
    </PageLayout>
    </>
  )
};

export default Timer;
