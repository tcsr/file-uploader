import React, { useState } from 'react';
import { CssBaseline, Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MultiFileUpload from './components/MultiFileUpload';
import Header from './components/Header';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';

function App() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepCompletion = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container className="border-none layout-main-container">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          {/* <Typography variant="h4" gutterBottom>Multi-Step File Upload</Typography> */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 1: Select Project {completedSteps.includes(1) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StepOne onComplete={() => handleStepCompletion(1)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 2: Create SonarQube Connection {completedSteps.includes(2) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StepTwo onComplete={() => handleStepCompletion(2)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 3: Upload Files {completedSteps.includes(3) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MultiFileUpload onComplete={() => handleStepCompletion(3)} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </>
  );
}

export default App;
