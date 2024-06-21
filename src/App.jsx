import { CssBaseline } from "@mui/material";
import MultiFileUpload from './components/MultiFileUpload'
import Header from "./components/Header";

function App() {

  return (
    <>
      <CssBaseline />
      <Header />
      <div className="border-none layout-main-container">
        <MultiFileUpload />
      </div>
    </>
  )
}

export default App
