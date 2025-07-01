// 📄 src/pages/dashboard/pharmacy/inventory.jsx
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';

export default function PharmacyInventoryPage() {
  return (
    <>
      <Helmet>
        <title>Inventory Management | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Inventory Management
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Pharmacy Inventory page - Coming Soon
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </DashboardContent>
    </>
  );
}
