// StepOne.js
import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, CircularProgress, Typography } from '@mui/material';
import { useProject } from './ProjectContext';
import axios from 'axios';

const ProjectSelectionStep = ({ onComplete }) => {
  const { setProject } = useProject();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/migrate/projects');
        setProjects(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects', error);
        setError('Failed to fetch projects');
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    const project = event.target.value;
    setSelectedProject(project);
    setProject(project);
    onComplete();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className="mb-2">
      <FormControl fullWidth>
        <InputLabel id="project-select-label">Select Project</InputLabel>
        <Select
          labelId="project-select-label"
          value={selectedProject}
          label="Select Project"
          onChange={handleProjectChange}
        >
          {projects && projects?.map((proj) => (
            <MenuItem key={proj.projectId} value={proj}>
              {proj.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProjectSelectionStep;
