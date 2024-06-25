import React from 'react';
import { Box, Button } from '@mui/material';

const StepTwo = ({ onComplete }) => {
  const handleComplete = () => {
    onComplete();
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleComplete} sx={{ mt: 2 }}>
        Create SonarQube Connection
      </Button>
    </Box>
  );
};

export default StepTwo;
