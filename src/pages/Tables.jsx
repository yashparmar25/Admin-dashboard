import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography, Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor: params.value === 'Active' ? '#2e7d32' : '#ed6c02',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.875rem',
        }}
      >
        {params.value}
      </Box>
    ),
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon.snow@example.com', status: 'Active' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei.lannister@example.com', status: 'Inactive' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime.lannister@example.com', status: 'Active' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya.stark@example.com', status: 'Active' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28, email: 'daenerys.targaryen@example.com', status: 'Inactive' },
  { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', age: 150, email: 'melisandre@example.com', status: 'Active' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara.clifford@example.com', status: 'Active' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini.frances@example.com', status: 'Inactive' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey.roxie@example.com', status: 'Active' },
];

const Tables = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Data Tables
      </Typography>
      
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Tables; 