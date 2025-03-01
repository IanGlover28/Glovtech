import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuthStore } from './stores/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage';
import AdminDashboardPage from './components/admin/AdminDashboard';
// import StaffDashboardPage from './pages/StaffDashboardPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// PrivateRoute component for protected routes
const PrivateRoute: React.FC<{
  element: React.ReactNode;
  requiredRole?: 'admin' | 'staff';
}> = ({ element, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return user?.role === 'admin' 
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/staff/dashboard" />;
  }
  
  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPasswordRequestPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<PrivateRoute element={<AdminDashboardPage />} requiredRole="admin" />} 
          />
          {/* <Route 
            path="/staff/dashboard" 
            element={<PrivateRoute element={<StaffDashboardPage />} requiredRole="staff" />} 
          /> */}
          
          {/* Redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;