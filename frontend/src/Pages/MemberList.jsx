import { Box, Link, Menu, MenuItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const MemberList = () => {
  const columns = [
    { field: 'status', headerAlign: 'center', headerName: 'Status', width: 140 },
    {
      field: 'name',
      headerName: 'Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      headerAlign: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {field: 'team', headerAlign: 'center', headerName: 'Team', width: 200 },
    {field: 'position', headerAlign: 'center', headerName: 'Position', width: 200 },
    {field: 'availability', headerAlign: 'center', headerName: 'Availability', width: 170, align: 'center' },
  ];
  
  const rows = [
    { id: 1, status: 'Mentor', lastName: 'Snow', firstName: 'Jon', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 2, status: 'Mentor', lastName: 'Parrot', firstName: 'Sagacious', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 3, status: 'Mentor', lastName: 'Leopard', firstName: 'Looney', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 4, status: 'Mentor', lastName: 'Runner', firstName: 'Road', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 5, status: 'Mentor', lastName: 'World', firstName: 'Hello', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 6, status: 'Mentor', lastName: 'Leprechaun', firstName: 'Lucky', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 7, status: 'Mentor', lastName: 'Doe', firstName: 'Jon', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 8, status: 'Mentor', lastName: '', firstName: 'Cher', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
    { id: 9, status: 'Mentor', lastName: 'Snow', firstName: 'Jon', team: 'Application Development', position: 'Full Stack Developer', availability: '-',  },
  ];

  return (
      <>
        <Typography variant='h1' component='h1'>Connect with us!</Typography>
        <Box sx={{
          display: 'flex',
        }}>
          <Box p={5} sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',
            width: '314px',
            backgroundColor: '#FCBA19'
          }}>
            <Link p={1} textAlign='center' fontWeight='bold'>Dashboard</Link>
            <Link p={1} textAlign='center' fontWeight='bold'>Mentor Match</Link>
            <Link p={1} textAlign='center' fontWeight='bold'>Personal Board</Link>
            <Link p={1} textAlign='center' fontWeight='bold'>Calendar</Link>
            <Link p={1} textAlign='center' fontWeight='bold'>History</Link>
            <Link p={1} textAlign='center' fontWeight='bold'>Settings</Link>
          </Box>
          <Box sx={{ height: '100vh', width: '100%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            >
            </DataGrid>
          </Box>
        </Box>
      </>
      
  )
}

export default MemberList;
