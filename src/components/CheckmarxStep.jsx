import React, { useState } from 'react';
import { Box, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useProject } from './ProjectContext';
import axios from 'axios';

const CheckmarxStep = ({ onComplete }) => {
    const { project } = useProject();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    const handleComplete = async () => {
        setLoading(true);
        try {
            const response = await axios.post('YOUR_API_ENDPOINT_FOR_CHECKMARX', { project });
            console.log(response.data);
            setAlert({ open: true, severity: 'success', message: 'Checkmarx connection created successfully' });
            onComplete();
        } catch (error) {
            console.error('Error creating Checkmarx connection', error);
            setAlert({ open: true, severity: 'error', message: 'Failed to create Checkmarx connection' });
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
                {loading ? 'Creating...' : 'Create Checkmarx Service Connection'}
            </Button>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }} variant="filled">
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CheckmarxStep;
