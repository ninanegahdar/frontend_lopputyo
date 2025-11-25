import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from 'react-router';

function App() {
  return (
    <>
    <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Training
          </Typography>

            <nav>
              <Link to={"/"}>Home</Link>
              <Link to={"/customers"}>Customers</Link>
              <Link to={"/trainings"}>Trainings</Link>
            </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />{/*Home/Customers/Trainings*/}
      </Container>
    </>
  );
}

export default App;
