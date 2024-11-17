import React, { useState } from 'react';
import {
  Grid, Typography, FormControl, Select, MenuItem, Button, Box, Accordion, AccordionSummary, AccordionDetails,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import FeeCard from './FeeCard';
import { useNavigate } from "react-router-dom";import { Link } from 'react-router-dom';




const FeePayments = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleApplyForScholarship = () => {
    // Scholarship application logic, using window location for navigation
    // window.location.href = '/scholarship';
    navigate('/scholarship');
  };

  const handleDownloadReceipt = () => {
    if (semester) {
      alert(`Downloading receipt for Semester ${semester}`);
    }
  };

  const fees = [
    { id: 1, type: 'Tuition', remainingDays: 15, icon: 'school', amount: 1000, details: 'Tuition fee for the semester' },
    { id: 2, type: 'Hostel', remainingDays: 30, icon: 'house', amount: 500, details: 'Hostel accommodation fee' },
    { id: 3, type: 'Medical', remainingDays: 5, icon: 'local_hospital', amount: 200, details: 'Medical insurance fee' },
  ];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Fee Payment Portal
      </Typography>

      <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 2 }}>
        Please select your semester to view fee details and download your receipt.
      </Typography>

      <FormControl fullWidth sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Select
          labelId="semester-select-label"
          value={semester}
          onChange={handleSemesterChange}
          sx={{ width: isSmallScreen ? '100%' : '300px', textAlign: 'center' }}
        >
          <MenuItem value="" disabled>Select Semester</MenuItem>
          {[...Array(8)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>Semester {i + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {semester && (
        <>
          <Typography variant="h5" gutterBottom textAlign="center">
            Fees for Semester {semester}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {fees.map(fee => (
              <Grid item xs={12} sm={6} md={4} key={fee.id}>
                <FeeCard fee={fee} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDownloadReceipt}
              disabled={!semester}
              sx={{ width: 'fit-content' }}
            >
              Download Receipt for Semester {semester}
            </Button>
          </Box>
        </>
      )}

      {/* Scholarship Application Section */}
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f7faff' }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Apply for Scholarship
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 2 }}>
          Students are encouraged to apply for available scholarships. Check eligibility and submit your application below.
        </Typography>

        <Link to={`/scholarship`} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ display: 'block', mx: 'auto' }}
        >
          Go to Scholarship Application
        </Button>
        </Link>

      </Box>

      {/* FAQ Section with Accordion */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>What happens if I miss the payment deadline?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Missing the deadline will result in a late fee. You may also experience restricted access to certain facilities. Contact the administration for more information.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>Can I apply for multiple scholarships?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Yes, students are allowed to apply for multiple scholarships if eligible. Each application will be reviewed independently.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>How do I download my fee receipts?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Select your semester from the dropdown and click "Download Receipt" to download the corresponding fee receipt.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>Who should I contact for payment assistance?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              For assistance, please contact the Student Finance Office at <strong>finance@university.edu</strong> or visit their office during business hours.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  );
};

export default FeePayments;
