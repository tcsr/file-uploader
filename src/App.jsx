import { useState } from 'react';
import { CssBaseline, Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MultiFileUpload from './components/MultiFileUpload';
import Header from './components/Header';
import { ProjectProvider } from './components/ProjectContext';
import ProjectSelectionStep from './components/ProjectSelectionStep';
import SonarQubeStep from './components/SonarQubeStep';
import KubernetesStep from './components/KubernetesStep';
import CheckmarxStep from './components/CheckmarxStep';

function App() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [failedSteps, setFailedSteps] = useState([]);
  const [expanded, setExpanded] = useState('step1');

  const handleStepCompletion = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    if (failedSteps.includes(step)) {
      setFailedSteps(failedSteps.filter((s) => s !== step));
    }
  };

  const handleStepFailure = (step) => {
    if (!failedSteps.includes(step)) {
      setFailedSteps([...failedSteps, step]);
    }
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter((s) => s !== step));
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              <ProjectSelectionStep onComplete={() => handleStepCompletion(1)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 2: Create Kubernetes Service Connection {completedSteps.includes(3) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <KubernetesStep onComplete={() => handleStepCompletion(3)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 3: Create SonarQube Connection {completedSteps.includes(2) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SonarQubeStep onComplete={() => handleStepCompletion(2)} />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Step 4: Create Checkmarx Service Connection {completedSteps.includes(4) && <CheckCircleIcon color="success" />}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckmarxStep onComplete={() => handleStepCompletion(4)} />
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
