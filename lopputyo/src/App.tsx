import CustomerList from "./components/CustomerList"
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <>
    <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customers
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <CustomerList />
      </Container>
    </>
  );
}

export default App;
