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
  Divider,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const StaffDashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = {
    todaySales: 12,
    todayRevenue: '$1,240',
    pendingTasks: 3,
    lowStockItems: 8
  };

  // Mock data for quick actions
  const quickActions = [
    { id: 1, title: 'New Sale', path: '/staff/sales/new' },
    { id: 2, title: 'Check Inventory', path: '/staff/inventory' },
    { id: 3, title: 'Upload Invoice', path: '/staff/invoices/upload' },
  ];

  // Mock low stock items
  const lowStockItems = [
    { id: 1, name: 'Product A', stock: 5, reorderLevel: 10 },
    { id: 2, name: 'Product B', stock: 3, reorderLevel: 15 },
    { id: 3, name: 'Product C', stock: 8, reorderLevel: 20 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Today's Sales
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.todaySales}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revenue: {stats.todayRevenue}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Pending Tasks
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.pendingTasks}
            </Typography>
            <Typography variant="body2" color="warning.main">
              Needs your attention
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Low Stock Items
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              {stats.lowStockItems}
            </Typography>
            <Typography variant="body2" color="error">
              Below reorder level
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {quickActions.map(action => (
                <Button 
                  key={action.id} 
                  variant="outlined" 
                  size="small" 
                  component={Link} 
                  to={action.path}
                >
                  {action.title}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Additional Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Low Stock Items" />
            <CardContent>
              <List>
                {lowStockItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={item.name}
                        secondary={`Current Stock: ${item.stock} / Reorder Level: ${item.reorderLevel}`}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/staff/inventory"
                >
                  View All
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Today's Tasks" />
            <CardContent>
              <Typography variant="body1" paragraph>
                Here are your tasks for today:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Update inventory for new shipment" 
                    secondary="Priority: High" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Process pending sales orders" 
                    secondary="Priority: Medium" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Check expiring products" 
                    secondary="Priority: Low" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDashboard;