import React from 'react';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleRedirect = (page) => {
    navigate(`/${page}`);
  };

  return (
    <React.Fragment>
      <Box sx={{ my: { lg: 14, xs: 8 } }}>
        <Container>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={4} order={{ lg: 1, xs: 2 }}>
              <img src="../assets/images/svg-graphics/fp-g.svg" alt="" style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} order={{ lg: 2, xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Box sx={{ mb: { lg: 9, xs: 5 } }}>
                  <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Forgot your password?
                  </Typography>
                  <Typography>
                    Please enter the email address associated with your account and We will email you a link to reset your password.
                  </Typography>
                </Box>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        fullWidth
                        id="formForgetEmail"
                        label="Email address"
                        placeholder="Email"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'grid', gap: 2 }}>
                      <Button type="submit" variant="contained" color="primary">
                        Reset Password
                      </Button>
                      <Button href="/Login" variant="outlined" onClick={() => handleRedirect("Login")}>
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPassword;
