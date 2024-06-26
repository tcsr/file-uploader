import React, { useState } from 'react';
import { CssBaseline, Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MultiFileUpload from './components/MultiFileUpload';
import Header from './components/Header';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import { ProjectProvider } from './components/ProjectContext';

function App() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepCompletion = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <ProjectProvider>
      <CssBaseline />
      <Header />
      <Container className="border-none layout-main-container">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Accordion expanded>
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
              <Typography>Step 3: Create Kubernetes Service Connection {completedSteps.includes(3) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StepThree onComplete={() => handleStepCompletion(3)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 4: Create Checkmarx Service Connection {completedSteps.includes(4) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StepFour onComplete={() => handleStepCompletion(4)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 5: Upload Files {completedSteps.includes(5) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MultiFileUpload onComplete={() => handleStepCompletion(5)} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </ProjectProvider>
  );
}

export default App;
