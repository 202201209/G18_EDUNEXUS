import React from 'react';
import { Box } from '@mui/material';
import DashCards from '../Components/Dashboard/DashCards2';

function Dashboard() {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            {/* <Navbar /> */}
            <DashCards />
           
        </Box>
    );
}

export default Dashboard;
