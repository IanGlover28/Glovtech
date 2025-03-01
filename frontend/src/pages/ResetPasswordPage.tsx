import React from 'react';
import { Container, Box } from '@mui/material';
import PasswordResetForm from '../components/auth/PasswordResetForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <PasswordResetForm />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;