import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Copyright from "./Copyright";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      username: data.get('username'),
      password: data.get('password'),
      rememberMe: rememberMe,
    };
    // const loginData = {
    //   username: 'user1',
    //   password: 'pass1'
    // };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors
    }
    
  };

  const handleRedirect = (page) => {
    navigate(`/${page}`);
  };

  // const handleForgotPassword = () => {
  //   console.log("Redirect to forgot password page");
  //   // Implement your logic here, e.g., navigate to a forgot password page
  // };

  // const handleSignUp = () => {
  //   console.log("Redirect to sign up page");
  //   // Implement your logic here, e.g., navigate to a sign-up page
  // };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
    console.log("Remember me checked:", event.target.checked);
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Sign In
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
      </Container>
    </ThemeProvider>
  );
}
