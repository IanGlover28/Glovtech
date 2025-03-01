import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'} />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GlovTech Inventory
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your inventory with ease
        </Typography>
      </Box>
      <Paper elevation={3}>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage;