import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Home from "./Home";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
    <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: "#f73378" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Training
          </Typography>
          {/* Navigation */}
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/customers">Customers</Button>
            <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
