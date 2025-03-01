import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import authService from '../../services/authService';

const PasswordResetRequestForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'success' | 'error' | ''; message: string}>({
    type: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await authService.requestPasswordReset(email);
      setStatus({
        type: 'success',
        message: 'If an account with that email exists, you will receive password reset instructions.'
      });
      setEmail('');
    } catch (error) {
      // For security reasons, we don't want to reveal if an email exists in our system
      setStatus({
        type: 'success',
        message: 'If an account with that email exists, you will receive password reset instructions.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Reset Password
        </Typography>
        
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}
        
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
        
        <Button
          variant="text"
          onClick={() => navigate('/login')}
          fullWidth
        >
          Back to Login
        </Button>
      </Box>
    </Paper>
  );
};

export default PasswordResetRequestForm;