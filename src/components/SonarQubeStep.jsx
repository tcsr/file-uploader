import React, { useState, useRef } from 'react';
import { Box, Button, CircularProgress, Snackbar, Alert, Typography, IconButton } from '@mui/material';
import { FileUpload } from 'primereact/fileupload';
import { useProject } from './ProjectContext';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

const SonarQubeStep = ({ onComplete, onError }) => {
  const { project } = useProject();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    setFile(e.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.clear();
    }
  };

  const handleComplete = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project', project.projectName);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT_FOR_SONARQUBE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setAlert({ open: true, severity: 'success', message: 'SonarQube connection created successfully' });
      onComplete();
    } catch (error) {
      console.error('Error creating SonarQube connection', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to create SonarQube connection' });
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <FileUpload
        ref={fileInputRef}
        mode="basic"
        name="file"
        accept="*"
        maxFileSize={10000000}
        customUpload
        auto
        chooseLabel="Choose a file to upload"
        onSelect={handleFileSelect}
        onClear={handleFileRemove}
        uploadHandler={handleFileSelect}
      />
      {file && (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Selected File: {file.name}
          </Typography>
          <IconButton onClick={handleFileRemove} color="secondary">
            <Delete />
          </IconButton>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleComplete}
        sx={{ mt: 2 }}
        disabled={!project || !file || loading}
        startIcon={loading ? <CircularProgress size={24} /> : null}
      >
        {loading ? 'Creating...' : 'Create SonarQube Connection'}
      </Button>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SonarQubeStep;
