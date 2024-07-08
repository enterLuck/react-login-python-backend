import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Copyright from "./Copyright";

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const loginData = {
    //   email: data.get('email'),
    //   password: data.get('password'),
    // };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Successfully Logged In.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          if (data.access_level === 'E') {
            navigate('/employee-dashboard');
          } else {
            navigate('/client-dashboard');
          }
        }, 3000);
      } else {
        setSnackbarMessage(data.message || 'Login failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setTimeout(() => {setEmail('');setPassword('')}, 4000);
      }
    } catch (error) {
      setSnackbarMessage('Network error. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setTimeout(() => {setEmail('');setPassword('')}, 4000);
    }
  };


  const handleRedirect = (page) => {
    navigate(`/${page}`);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
    console.log("Remember me checked:", event.target.checked);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="./logo-circle-2.png"
            height="75px"
            sx={{ m: 1 }}
          />
          <Typography component="h1" variant="h5" sx={{ p: 2 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
              autoFocus
            />
            <TextField
              margin="normal"
              id="password"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleRememberMeChange} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <ButtonGroup>
              <Grid item xs>
                <Button href="/ForgotPassword" variant="text" size="small" onClick={() => handleRedirect("ForgotPassword")}>
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button href="/SignUp" variant="text" size="small" onClick={() => handleRedirect("SignUp")}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
              </ButtonGroup>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
