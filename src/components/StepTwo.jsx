import React, { useState } from 'react';
import { Box, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useProject } from './ProjectContext';
import axios from 'axios';

const StepTwo = ({ onComplete }) => {
  const { project } = useProject();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await axios.post('YOUR_API_ENDPOINT_FOR_SONARQUBE', { project });
      console.log(response.data);
      setAlert({ open: true, severity: 'success', message: 'SonarQube connection created successfully' });
      onComplete();
    } catch (error) {
      console.error('Error creating SonarQube connection', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to create SonarQube connection' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleComplete}
        sx={{ mt: 2 }}
        disabled={!project || loading}
        startIcon={loading ? <CircularProgress size={24} /> : null}
      >
        {loading ? 'Creating...' : 'Create SonarQube Connection'}
      </Button>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} variant="filled" severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StepTwo;
