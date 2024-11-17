import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { Twitter, LinkedIn, Facebook } from '@mui/icons-material'; // Import social media icons
import EligibilityCheck from './EligibilityCheck';

const ScholarshipDetails = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    student_id: '',
    application_year: new Date().getFullYear(),
    full_name: '',
    email: '',
    phone: '',
  });

  // Fetch all applications from the server
  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/scholarship/applications');
      const sortedApplications = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setApplications(sortedApplications); // Set all applications
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Get student ID from cookies and set it in the application state
  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/user/scholarship/applications', newApplication);
      alert('Application submitted successfully!');
      fetchApplications();
      setNewApplication({
        student_id: '',
        application_year: new Date().getFullYear(),
        full_name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit the application.');
    }
  };

  return (
    <Box
      sx={{
        padding: '3rem 1rem',
        backgroundColor: '#e0f7fa',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: '2rem',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title and Countdown */}
        <Typography variant="h4" sx={{ fontWeight: '700', color: '#0d47a1', mb: 3 }}>
          Merit Cum Means Scholarship
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#1a237e', mt: 2 }}>
          The XYZ College Scholarship is designed to support outstanding students by covering tuition and additional stipends. Learn more and apply below.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Scholarship Amount & Benefits */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: 4 }}>
          Scholarship Amount & Benefits
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[
            { title: 'Total Amount', value: 'INR 50,000' },
            { title: 'Stipend & Books', value: 'Tuition, monthly stipend, and book allowance.' },
            { title: 'Additional Benefits', value: 'Free access to workshops and networking events.' },
          ].map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  padding: '1.5rem',
                  backgroundColor: '#bbdefb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '150px',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#1a237e', mt: 1 }}>
                  {benefit.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Deadline Information */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: 4 }}>
          Scholarship Deadline
        </Typography>
        <Typography variant="body1" sx={{ color: '#1a237e', mb: 4 }}>
          The last date to submit your application is <strong>December 31, 2024</strong>. Don't miss the chance to apply!
        </Typography>

        <Box sx={{ my: 4 }} />

        {/* Eligibility Check */}
        <EligibilityCheck />

        <Divider sx={{ my: 3 }} />

        {/* Application Form */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: 4 }}>
          Apply for Scholarship
        </Typography>
        <Box sx={{ mt: 2, mb: 4 }}>
          <TextField
            label="Student ID"
            variant="outlined"
            fullWidth
            value={JSON.parse(localStorage.getItem("userInfo")).SID}
            disabled // Make the field non-editable
            sx={{ mb: 2 }}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={newApplication.full_name}
            onChange={(e) => setNewApplication({ ...newApplication, full_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newApplication.email}
            onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={newApplication.phone}
            onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* All Submitted Applications */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: 4 }}>
          All Submitted Applications
        </Typography>
        <br />
        <Grid container spacing={3}>
          {applications.length > 0 ? (
            applications.map((app) => (
              <Grid item xs={12} sm={6} md={4} key={app.id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#0d47a1' }}>
                      {app.full_name}
                    </Typography>
                    <Typography variant="body2">Year: {app.application_year}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color:
                          app.status === 'Accepted'
                            ? 'green'
                            : app.status === 'Rejected'
                            ? 'red'
                            : 'orange',
                      }}
                    >
                      Status: {app.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#1a237e', textAlign: 'center', mt: 3 }}>
              No applications submitted yet.
            </Typography>
          )}
        </Grid>

        {/* Refer a Friend Section */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: 4 }}>
          Refer a Friend
        </Typography>
        <Typography variant="body1" sx={{ color: '#1a237e', mb: 2 }}>
          Know someone who might be interested? Share the opportunity!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton href="#" target="_blank">
            <Twitter sx={{ color: '#1DA1F2' }} />
          </IconButton>
          <IconButton href="#" target="_blank">
            <LinkedIn sx={{ color: '#0077B5' }} />
          </IconButton>
          <IconButton href="#" target="_blank">
            <Facebook sx={{ color: '#3b5998' }} />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScholarshipDetails;
