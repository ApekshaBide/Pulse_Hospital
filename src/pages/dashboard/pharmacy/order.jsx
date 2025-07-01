/ 📄 src/pages/dashboard/pharmacy/order.jsx
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';

export default function PharmacyOrderPage() {
  const { orderId } = useParams();

  return (
    <>
      <Helmet>
        <title>Order Details | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Order Details - {orderId}
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Order page for ID: {orderId} - Coming Soon
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </DashboardContent>
    </>
  );
}

