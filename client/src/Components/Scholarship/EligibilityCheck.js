// EligibilityCheck.js
import React, { useState } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const EligibilityCheck = () => {
  const [criteria, setCriteria] = useState({ year: '', income: '', gpa: '' });
  const [isEligible, setIsEligible] = useState(null);

  const handleChange = (event) => {
    setCriteria({ ...criteria, [event.target.name]: event.target.value });
  };

  const checkEligibility = () => {
    if ((criteria.year === 'Final Year' || criteria.year === 'Third Year') && criteria.income === 'Below 5 LPA'  && criteria.gpa >= 7.5) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ color: '#1565c0', mb: 1 }}>Check Your Eligibility</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Year of Study</InputLabel>
            <Select
              name="year"
              value={criteria.year}
              onChange={handleChange}
              label="Year of Study"
            >
              <MenuItem value="First Year">First Year</MenuItem>
              <MenuItem value="Second Year">Second Year</MenuItem>
              <MenuItem value="Third Year">Third Year</MenuItem>
              <MenuItem value="Final Year">Final Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Family Income</InputLabel>
            <Select
              name="income"
              value={criteria.income}
              onChange={handleChange}
              label="Family Income"
            >
              <MenuItem value="Below 5 LPA">Below 5 LPA</MenuItem>
              <MenuItem value="5-10 LPA">5-10 LPA</MenuItem>
              <MenuItem value="Above 10 LPA">Above 10 LPA</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>CGPA</InputLabel>
            <Select
              name="gpa"
              value={criteria.gpa}
              onChange={handleChange}
              label="GPA"
            >
              <MenuItem value={6}>6+</MenuItem>
              <MenuItem value={7.5}>7.5+</MenuItem>
              <MenuItem value={9}>9+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={checkEligibility}>Check Eligibility</Button>
      </Box>

      {isEligible !== null && (
        <Typography variant="subtitle1" sx={{ color: isEligible ? 'green' : 'red', mt: 2, textAlign: 'center' }}>
          {isEligible ? 'You are eligible for this scholarship!' : 'You do not meet the eligibility criteria.'}
        </Typography>
      )}
    </Box>
  );
};

export default EligibilityCheck;
