import React from 'react';
import { Container, Box } from '@mui/material';
import PasswordResetRequestForm from '../components/auth/PasswordResetRequestForm';

const ResetPasswordRequestPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <PasswordResetRequestForm />
      </Box>
    </Container>
  );
};

export default ResetPasswordRequestPage;