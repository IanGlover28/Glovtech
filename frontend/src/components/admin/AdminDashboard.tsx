import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = {
    totalProducts: 256,
    lowStock: 15,
    expiringSoon: 8,
    totalSales: '$15,240',
    todaySales: '$1,240',
    activeUsers: 12
  };

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Added new product', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Completed sale transaction', time: '15 minutes ago' },
    { id: 3, user: 'Mike Johnson', action: 'Updated inventory count', time: '1 hour ago' },
    { id: 4, user: 'Sarah Williams', action: 'Added new invoice', time: '3 hours ago' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Products
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.totalProducts}
            </Typography>
            <Typography variant="body2" color="error">
              {stats.lowStock} Low Stock Items
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Sales
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.todaySales}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {stats.totalSales} this month
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Expiring Products
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.expiringSoon}
            </Typography>
            <Typography variant="body2" color="warning.main">
              Products expiring within 30 days
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Activities" />
            <CardContent>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`${activity.user} - ${activity.action}`}
                        secondary={activity.time}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="System Overview" />
            <CardContent>
              <Typography variant="body1" paragraph>
                Welcome to the GlovTech Inventory Management System. As an administrator, you have access to all features and functionalities.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users: {stats.activeUsers} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last System Update: 1 hour ago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;