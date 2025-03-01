import React from 'react';
import Layout from '../components/common/Layout';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  return (
    <Layout>
      <AdminDashboard />
    </Layout>
  );
};

export default AdminDashboardPage;