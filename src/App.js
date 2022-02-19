import logo from './logo.svg';
import './App.css';
import {Button, Container, Paper, Typography} from "@mui/material";

function App() {
  return (
      <Container maxWidth="sm" className="App">
        <Paper>
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            Geekify project v2
          </Typography>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
        </Paper>
      </Container>
  );
}

export default App;
