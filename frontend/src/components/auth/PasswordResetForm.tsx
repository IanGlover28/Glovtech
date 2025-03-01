import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import authService from '../../services/authService';

const PasswordResetForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{type: 'success' | 'error' | ''; message: string}>({
    type: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (newPassword !== confirmPassword) {
      setStatus({
        type: 'error',
        message: 'Passwords do not match.'
      });
      return;
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setStatus({
        type: 'error',
        message: 'Password must be at least 8 characters long.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      if (!token) throw new Error('Reset token is missing');
      
      await authService.resetPassword({ token, newPassword });
      
      setStatus({
        type: 'success',
        message: 'Password reset successful. You can now login with your new password.'
      });
      
      // Clear form
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Password reset failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Set New Password
        </Typography>
        
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}
        
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Resetting...' : 'Reset Password'}
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

export default PasswordResetForm;