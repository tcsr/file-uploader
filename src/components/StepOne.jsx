import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const StepOne = ({ onComplete }) => {
  const [project, setProject] = useState('');

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="project-select-label">Select Project</InputLabel>
        <Select
          labelId="project-select-label"
          value={project}
          label="Select Project"
          onChange={handleProjectChange}
        >
          <MenuItem value="project1">Project 1</MenuItem>
          <MenuItem value="project2">Project 2</MenuItem>
          <MenuItem value="project3">Project 3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleComplete} disabled={!project} sx={{ mt: 2 }}>
        Complete Step
      </Button>
    </Box>
  );
};

export default StepOne;
