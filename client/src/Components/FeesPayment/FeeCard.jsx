import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import HouseIcon from '@mui/icons-material/House';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const icons = {
  school: <SchoolIcon />,
  house: <HouseIcon />,
  local_hospital: <LocalHospitalIcon />,
};

const FeeCardContainer = styled(Card)(({ theme }) => ({
  borderRadius: '16px', // Rounded corners
  padding: '10px',
  background: '#ffffff', // 3D white color
  transition: 'background 0.3s ease, transform 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow for elevation
  '&:hover': {
    background: 'linear-gradient(45deg, #2196f3, #1976d2)', // Blue gradient on hover
    color: '#fff',
    transform: 'scale(1.03)', // Slight scaling effect on hover
  },
}));

const FeeCard = ({ fee }) => {
  const handlePayment = () => {
    alert(`Initiating payment for ${fee.type}`);
  };

  return (
    <FeeCardContainer>
      <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icons[fee.icon]}
          <Typography variant="h6" style={{ marginLeft: '10px' }}>{fee.type}</Typography>
        </div>
        <Typography variant="body1" color="textSecondary" style={{ marginRight: '0px' }}>{fee.remainingDays} days remaining</Typography>
      </CardContent>
      <Typography variant="h5" style={{ margin: '10px 0' }}>Amount: ${fee.amount}</Typography>
      <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
        {fee.details}
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePayment} style={{ margin: '10px 0', width: '100%', transition: 'background 0.3s ease' }}>
        Pay Now
      </Button>
    </FeeCardContainer>
  );
};

export default FeeCard;
