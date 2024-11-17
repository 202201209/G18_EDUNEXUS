import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Movable from './Movable';
import TimeTable from './TimeTable';
import Events from './Events';
import '../../CSS/DashCards.css';
import DashCourse from './DashCourse';
import { useState, useEffect } from 'react';
import Calendar from "./Calendar"
import axios from 'axios';
 
 const ENDPOINT = process.env.BACKEND_URL || 'http://localhost:3001';


function ProfCards() {
  const Api = `${ENDPOINT}/api/user/dashboard?ID=P001`;
  const [event, setevent] = useState("");
  const [TableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(Api);
      console.log(response.data);
      setevent(response.data?.upcoming_events_data);
      setTableData(response.data?.time_table_data);
    }
    catch (error) {
      setError(error);
      console.log(error);
    }


  }

  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <Box>
      <Grid container>
        <h1>Welcome, Sir</h1>

        <Grid container spacing={2}>
          <Grid item md={12}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

            }}>
              <Paper sx={{ borderRadius: '20px', width: '400px', height: '200px', ml: 5 }}>

                <DashCourse />
              </Paper>
              <Paper sx={{ borderRadius: '20px', ml: 5, mr: 5 }}>

                <Events height={200} event={event}></Events>
              </Paper>
              <Paper sx={{ borderRadius: '20px', height: "320px" }}>

                <Calendar />
              </Paper>
            </Box>
            <Box sx={{
              margin: '5px'
            }}>
              <TimeTable TableData={TableData} />
            </Box>

          </Grid>



        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfCards;
